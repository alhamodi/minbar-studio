const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Directories mapped to root
const dirs = ['overlay', 'control', 'assets', 'components', 'widgets', 'themes', 'animations', 'shared', 'docs', 'examples'];
dirs.forEach(dir => {
    app.use(`/${dir}`, express.static(path.join(__dirname, dir)));
});

app.get('/', (req, res) => {
    res.redirect('/control/index.html');
});

// --- State Management ---
const STATE_FILE = path.join(__dirname, 'server', 'state.json');

// Default initial state matching requirements
let globalState = {
    scene: 'startingSoon',
    theme: 'gold', // refers to gold.json
    widgets: {
        lowerThird: { show: false, name: 'Speaker Name', title: 'Topic' },
        clock: { show: true, format: '24h' },
        countdown: { show: false, target: 0, text: 'Starting In' },
        socials: { show: true, handles: ['@twitter', '@instagram'] },
        ticker: { show: true, text: 'Welcome to the stream!' },
        subscriberGoal: { show: false, current: 0, target: 100 },
        logo: { show: true, url: '' }
    },
    layout: {
        resolution: '1920x1080',
        safeMargins: true
    }
};

// Load state from disk
if (fs.existsSync(STATE_FILE)) {
    try {
        const data = fs.readFileSync(STATE_FILE, 'utf8');
        globalState = JSON.parse(data);
    } catch (e) {
        console.error('Error loading state:', e);
    }
}

// Auto-save function
function saveState() {
    if (!fs.existsSync(path.join(__dirname, 'server'))) {
        fs.mkdirSync(path.join(__dirname, 'server'));
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(globalState, null, 2));
}

// --- WebSocket Broker ---
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send(JSON.stringify({ type: 'SYNC_STATE', payload: globalState }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            if (data.type === 'UPDATE_STATE') {
                // Deep merge state
                globalState = { ...globalState, ...data.payload };
                saveState();
                
                // Broadcast to all clients
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'SYNC_STATE', payload: globalState }));
                    }
                });
            }
            else if (data.type === 'TRIGGER_ANIMATION') {
                // E.g., play stinger transition, pop up alert
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message.toString());
                    }
                });
            }

        } catch (e) {
            console.error('Error processing WS message:', e);
        }
    });
});

// API Routes for Dashboard
app.get('/api/themes', (req, res) => {
    const themesDir = path.join(__dirname, 'themes');
    if (!fs.existsSync(themesDir)) return res.json([]);
    const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'));
    res.json(files.map(f => f.replace('.json', '')));
});

const archiver = require('archiver');

app.get('/api/export', (req, res) => {
    res.attachment('obs-stream-pack.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    archive.on('error', (err) => { res.status(500).send({ error: err.message }); });
    archive.pipe(res);
    
    // Append directories
    const dirsToExport = ['assets', 'components', 'widgets', 'themes', 'animations', 'overlay', 'control', 'shared'];
    dirsToExport.forEach(dir => {
        const fullPath = path.join(__dirname, dir);
        if (fs.existsSync(fullPath)) archive.directory(fullPath, dir);
    });
    
    // Include state and server script
    archive.file(path.join(__dirname, 'server.js'), { name: 'server.js' });
    archive.file(path.join(__dirname, 'package.json'), { name: 'package.json' });
    if (fs.existsSync(STATE_FILE)) archive.file(STATE_FILE, { name: 'server/state.json' });
    
    archive.finalize();
});

server.listen(PORT, () => {
    console.log(`Commercial OBS Backend running on http://localhost:${PORT}`);
});
