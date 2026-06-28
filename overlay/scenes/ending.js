import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.ending?.title || 'Stream Ending';
        const subtitle = state.scenes?.ending?.subtitle || 'Jazakallah Khair for watching';
        return `<div class="scene-layout center-focus fade-to-black-bg">
            <div class="content-box elegant-panel fade-up">
                <h2 class="scene-title">${title}</h2>
                <p class="scene-subtitle">${subtitle}</p>
            </div>
        </div>`;
    }
    update(state) {}
    
    
}
