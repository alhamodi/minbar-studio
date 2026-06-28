import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const text = state.scenes?.quran?.text || 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
        return `<div class="scene-layout dual-language serene-bg">
            <div class="content-box glass-panel slide-up">
                <div class="quran-ornament top"></div>
                <h1 class="arabic-text massive" style="font-size: 6rem; line-height:1.6;">${text}</h1>
                <div class="quran-ornament bottom"></div>
            </div>
        </div>`;
    }
    update(state) {}
    
    
}
