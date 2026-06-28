import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.sponsor?.title || 'Thank You To Our Sponsors';
        return `<div class="scene-layout split-horizontal">
            <div class="top-pane">
                <h2 class="scene-title">${title}</h2>
            </div>
            <div class="bottom-pane logo-carousel">
                <div style="font-size: 2rem; color: var(--theme-color-accent);">[Sponsor Logos Render Here]</div>
            </div>
        </div>`;
    }
    update(state) {}
    
    
}
