const wsHost = window.location.hostname || 'localhost';
const wsPort = window.location.port || '3000';
let ws = null;
let globalState = {};
let history = []; // for undo

const SCENES = ['startingSoon', 'countdown', 'live', 'intermission', 'brb', 'ending', 'offline', 'announcement', 'sponsor', 'schedule', 'dua', 'quran'];
const WIDGETS = ['clock', 'countdown', 'socials', 'ticker', 'speakerInfo', 'eventTitle', 'subtitle', 'logo', 'donationGoal', 'subscriberGoal', 'followerGoal', 'chatBox', 'qrCode'];

function connect() {
    ws = new WebSocket(\`ws://\${wsHost}:\${wsPort}\`);
    ws.onopen = () => {
        document.getElementById('ws-indicator').classList.add('connected');
        document.getElementById('ws-status').textContent = 'Connected';
    };
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'SYNC_STATE') {
            globalState = data.payload;
            renderScenes();
            renderWidgets();
            if(globalState.theme) document.getElementById('theme-select').value = globalState.theme;
        }
    };
    ws.onclose = () => {
        document.getElementById('ws-indicator').classList.remove('connected');
        setTimeout(connect, 3000);
    };
}

function updateState(partial) {
    if (ws.readyState === WebSocket.OPEN) {
        history.push(JSON.parse(JSON.stringify(globalState))); // clone for undo
        ws.send(JSON.stringify({ type: 'UPDATE_STATE', payload: partial }));
    }
}

function undo() {
    if(history.length > 0) {
        const prevState = history.pop();
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'UPDATE_STATE', payload: prevState })); // full replace
        }
    }
}

function showTab(id) {
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(\`tab-\${id}\`).classList.add('active');
    event.currentTarget.classList.add('active');
}

function renderScenes() {
    const q = (document.getElementById('scene-search')?.value || '').toLowerCase();
    const grid = document.getElementById('scene-grid');
    grid.innerHTML = SCENES.filter(s => s.toLowerCase().includes(q)).map(s => \`
        <div class="card \${globalState.scene === s ? 'active' : ''}" onclick="selectScene('\${s}')">
            <h4>\${s.toUpperCase()}</h4>
        </div>
    \`).join('');
}

function renderWidgets() {
    const grid = document.getElementById('widget-grid');
    grid.innerHTML = WIDGETS.map(w => {
        const isActive = globalState.widgets && globalState.widgets[w] && globalState.widgets[w].show;
        return \`
        <div class="card \${isActive ? 'active' : ''}" onclick="selectWidget('\${w}')">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4>\${w}</h4>
                <input type="checkbox" \${isActive ? 'checked' : ''} onclick="event.stopPropagation(); toggleWidget('\${w}', this.checked)">
            </div>
        </div>
    \`}).join('');
}

function toggleWidget(id, show) {
    const widgets = { ...(globalState.widgets || {}) };
    if (!widgets[id]) widgets[id] = {};
    widgets[id].show = show;
    updateState({ widgets });
}

function selectScene(id) {
    updateState({ scene: id });
    const s = (globalState.scenes || {})[id] || {};
    
    // Auto-generate inspector based on some known props
    let html = \`<h4>Edit \${id}</h4>\`;
    html += \`<label>Title</label><input type="text" value="\${s.title || ''}" onchange="updateSceneProp('\${id}', 'title', this.value)">\`;
    if(id === 'startingSoon' || id === 'countdown') {
        html += \`<label>Target Time (Timestamp MS)</label><input type="number" value="\${s.targetTime || ''}" onchange="updateSceneProp('\${id}', 'targetTime', Number(this.value))">\`;
    }
    if(id === 'dua' || id === 'quran') {
        html += \`<label>Arabic Text</label><textarea onchange="updateSceneProp('\${id}', 'arabic', this.value)">\${s.arabic || ''}</textarea>\`;
    }
    document.getElementById('inspector-content').innerHTML = html;
}

function selectWidget(id) {
    const w = (globalState.widgets || {})[id] || {};
    let html = \`<h4>Edit \${id}</h4>\`;
    html += \`<label>Text / Value</label><input type="text" value="\${w.text || ''}" onchange="updateWidgetProp('\${id}', 'text', this.value)">\`;
    if(id.includes('Goal')) {
        html += \`<label>Current</label><input type="number" value="\${w.current || 0}" onchange="updateWidgetProp('\${id}', 'current', Number(this.value))">\`;
        html += \`<label>Target</label><input type="number" value="\${w.target || 100}" onchange="updateWidgetProp('\${id}', 'target', Number(this.value))">\`;
    }
    document.getElementById('inspector-content').innerHTML = html;
}

function updateSceneProp(sceneId, prop, val) {
    const scenes = { ...(globalState.scenes || {}) };
    if(!scenes[sceneId]) scenes[sceneId] = {};
    scenes[sceneId][prop] = val;
    updateState({ scenes });
}

function updateWidgetProp(widgetId, prop, val) {
    const widgets = { ...(globalState.widgets || {}) };
    if(!widgets[widgetId]) widgets[widgetId] = {};
    widgets[widgetId][prop] = val;
    updateState({ widgets });
}

function updateTheme(val) { updateState({ theme: val }); }

function saveProject() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalState, null, 2));
    const a = document.createElement('a'); a.href = dataStr; a.download = "stream-state.json"; a.click();
}

function loadProject(e) {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        try { updateState(JSON.parse(ev.target.result)); } catch(err) { alert('Invalid JSON'); }
    };
    reader.readAsText(file);
}

// Shortcuts
document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
});

fetch('/api/themes').then(res => res.json()).then(themes => {
    document.getElementById('theme-select').innerHTML = themes.map(t => \`<option value="\${t}">\${t}</option>\`).join('');
});

window.showTab = showTab;
window.selectScene = selectScene;
window.selectWidget = selectWidget;
window.toggleWidget = toggleWidget;
window.updateTheme = updateTheme;
window.saveProject = saveProject;
window.loadProject = loadProject;
window.undo = undo;
window.updateSceneProp = updateSceneProp;
window.updateWidgetProp = updateWidgetProp;
window.renderScenes = renderScenes;

connect();
