import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.announcement?.title || 'ANNOUNCEMENT';
        const text = state.scenes?.announcement?.text || 'Important update goes here.';
        return `<div class="scene-layout banner-focus">
            <div class="massive-banner slide-down">
                <h2 class="scene-title text-alert">${title}</h2>
                <p class="scene-subtitle large-text">${text}</p>
            </div>
        </div>`;
    }
    update(state) {}
    
    
}
