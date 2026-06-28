import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.brb?.title || 'Be Right Back';
        const subtitle = state.scenes?.brb?.subtitle || 'Grabbing some water...';
        return `<div class="scene-layout center-focus particles-bg">
            <div class="content-box glass-panel pulse-scale">
                <h2 class="scene-title">${title}</h2>
                <p class="scene-subtitle divider-bottom">${subtitle}</p>
            </div>
        </div>`;
    }
    update(state) {}
    
    
}
