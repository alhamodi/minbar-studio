import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.offline?.title || 'Stream is Offline';
        const subtitle = state.scenes?.offline?.subtitle || 'Check schedule for the next broadcast';
        return `<div class="scene-layout center-focus dark-bg">
            <div class="content-box minimalist-panel">
                <div class="status-dot offline-pulse"></div>
                <h2 class="scene-title">${title}</h2>
                <p class="scene-subtitle">${subtitle}</p>
            </div>
        </div>`;
    }
    update(state) {}
    
    
}
