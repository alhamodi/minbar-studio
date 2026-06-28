// Connect to local WebSocket Server
const wsHost = window.location.hostname || 'localhost';
const wsPort = window.location.port || '3000';
let ws = null;

// Local State
let state = {
    scene: 'startingSoon',
    lowerThird: { show: false },
    frame: { show: false }
};

function connectWebSocket() {
    ws = new WebSocket(`ws://${wsHost}:${wsPort}`);
    
    const statusIndicator = document.getElementById('ws-status');
    const statusText = document.getElementById('ws-status-text');

    ws.onopen = () => {
        statusIndicator.classList.add('connected');
        statusText.textContent = 'Connected to Server';
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'INIT_STATE') {
                syncUIWithState(data.payload);
            }
        } catch (e) {
            console.error('Failed to parse WebSocket message:', e);
        }
    };

    ws.onclose = () => {
        statusIndicator.classList.remove('connected');
        statusText.textContent = 'Disconnected. Reconnecting...';
        setTimeout(connectWebSocket, 3000);
    };
    
    ws.onerror = (err) => {
        console.error('WebSocket Error:', err);
    };
}

function sendCommand(type, payload = {}) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type, payload }));
    } else {
        alert("WebSocket is not connected!");
    }
}

// --- Sync UI on Initial Load ---
function syncUIWithState(serverState) {
    state = serverState;
    
    // Scene
    document.querySelectorAll('.scene-btn').forEach(btn => btn.classList.remove('btn-active'));
    const sceneBtn = document.getElementById(`btn-scene-${state.scene}`);
    if (sceneBtn) sceneBtn.classList.add('btn-active');

    // Lower Third
    if (state.lowerThird) {
        document.getElementById('lt-name').value = state.lowerThird.name || '';
        document.getElementById('lt-title').value = state.lowerThird.title || '';
        
        const btn = document.getElementById('btn-lt-toggle');
        if (state.lowerThird.show) {
            btn.textContent = 'Hide Lower Third';
            btn.classList.add('btn-danger');
        } else {
            btn.textContent = 'Show Lower Third';
            btn.classList.remove('btn-danger');
        }
    }
    
    // Colors
    if (state.theme) {
        document.getElementById('color-primary').value = state.theme.primary;
        document.getElementById('color-secondary').value = state.theme.secondary;
        document.getElementById('color-accent').value = state.theme.accent;
    }
}

// --- Actions ---

function setScene(sceneName) {
    state.scene = sceneName;
    document.querySelectorAll('.scene-btn').forEach(btn => btn.classList.remove('btn-active'));
    document.getElementById(`btn-scene-${sceneName}`).classList.add('btn-active');
    
    sendCommand('SET_SCENE', { scene: sceneName });
}

function toggleLowerThird() {
    state.lowerThird.show = !state.lowerThird.show;
    const btn = document.getElementById('btn-lt-toggle');
    
    if (state.lowerThird.show) {
        btn.textContent = 'Hide Lower Third';
        btn.classList.add('btn-danger');
    } else {
        btn.textContent = 'Show Lower Third';
        btn.classList.remove('btn-danger');
    }

    sendCommand('UPDATE_LOWER_THIRD', { 
        show: state.lowerThird.show,
        name: document.getElementById('lt-name').value,
        title: document.getElementById('lt-title').value
    });
}

function updateLowerThirdText() {
    sendCommand('UPDATE_LOWER_THIRD', { 
        name: document.getElementById('lt-name').value,
        title: document.getElementById('lt-title').value
    });
}

function startTimer() {
    const mins = parseInt(document.getElementById('timer-mins').value) || 5;
    sendCommand('START_COUNTDOWN', { minutes: mins });
}

function stopTimer() {
    sendCommand('STOP_COUNTDOWN');
}

function toggleFrame() {
    state.frame.show = !state.frame.show;
    const btn = document.getElementById('btn-frame-toggle');
    
    if (state.frame.show) {
        btn.textContent = 'Hide Frame';
        btn.classList.add('btn-danger');
    } else {
        btn.textContent = 'Show Frame';
        btn.classList.remove('btn-danger');
    }

    sendCommand('TOGGLE_FRAME', { show: state.frame.show });
}

function updateTheme() {
    sendCommand('UPDATE_THEME', {
        primary: document.getElementById('color-primary').value,
        secondary: document.getElementById('color-secondary').value,
        accent: document.getElementById('color-accent').value
    });
}

// Init
connectWebSocket();
