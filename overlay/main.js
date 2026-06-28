import { loadTheme } from '/shared/theme-loader.js';
import { SceneManager } from './scene-manager.js';
import { WidgetManager } from './widget-manager.js';
import { store } from './store.js';

const wsHost = window.location.hostname || 'localhost';
const wsPort = window.location.port || '3000';
let ws = null;

const sceneManager = new SceneManager(document.getElementById('layer-scenes'));
const widgetManager = new WidgetManager(document.getElementById('layer-widgets'));

store.subscribe(async (state) => {
    // 1. Theme
    if (state.theme) await loadTheme(state.theme);
    
    // 2. Layout
    if (state.layout && state.layout.resolution) updateLayout(state.layout.resolution);

    // 3. Scene
    if (state.scene) sceneManager.switchScene(state.scene, state);

    // 4. Widgets
    if (state.widgets) widgetManager.updateWidgets(state.widgets);
});

// Phase 9: Layout System
function updateLayout(resolutionStr) {
    const wrapper = document.getElementById('layout-wrapper');
    const [w, h] = resolutionStr.split('x').map(Number);
    
    // Set base dimensions
    wrapper.style.width = `${w}px`;
    wrapper.style.height = `${h}px`;
    
    // Calculate scale to fit window perfectly
    const scaleX = window.innerWidth / w;
    const scaleY = window.innerHeight / h;
    const scale = Math.min(scaleX, scaleY);
    
    wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener('resize', () => {
    // Re-trigger layout calculation on resize
    const currentRes = store.getState().layout?.resolution || '1920x1080';
    updateLayout(currentRes);
});

function connectWebSocket() {
    ws = new WebSocket(`ws://${wsHost}:${wsPort}`);

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'SYNC_STATE') {
                store.setState(data.payload);
            }
        } catch (e) {
            console.error('WS parse error:', e);
        }
    };

    ws.onclose = () => {
        setTimeout(connectWebSocket, 3000);
    };
}

// Init
connectWebSocket();
updateLayout('1920x1080'); // Initial default
