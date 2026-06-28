import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const arabic = state.scenes?.dua?.arabic || 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ';
        const translation = state.scenes?.dua?.translation || 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.';
        return `<div class="scene-layout dual-language serene-bg">
            <div class="content-box glass-panel expanded slide-up">
                <h1 class="arabic-text large">${arabic}</h1>
                <div style="height:2px; width:100%; background:var(--theme-color-accent); margin: 30px 0;"></div>
                <h2 class="scene-title text-muted" style="font-size: 2rem; font-family: var(--theme-font-body); text-transform: none; line-height: 1.5; color: var(--theme-color-text);">${translation}</h2>
            </div>
        </div>`;
    }
    update(state) {}
    
    
}
