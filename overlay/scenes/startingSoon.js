import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.startingSoon?.title || 'Starting Soon';
        const subtitle = state.scenes?.startingSoon?.subtitle || 'Please stand by';
        const targetTime = state.scenes?.startingSoon?.targetTime || (Date.now() + 300000);
        return `<div class="scene-layout center-focus parallax-bg">
            <div class="decoration top-left"></div>
            <div class="decoration bottom-right"></div>
            <div class="content-box glass-panel slide-up-stagger">
                <h1 class="arabic-text pulse-glow">بسم الله الرحمن الرحيم</h1>
                <h2 class="scene-title">${title}</h2>
                <div class="countdown-timer text-glow" id="scene-timer-startingSoon">00:00</div>
                <p class="scene-subtitle">${subtitle}</p>
                <div class="progress-bar-container"><div class="progress-bar-fill"></div></div>
            </div>
        </div>`;
    }
    update(state) { this.startTimer(state); }
    
    
    async enter(state) {
        await super.enter(state);
        this.startTimer(state);
    }
    startTimer(state) {
        if(this.timer) clearInterval(this.timer);
        const el = this.el.querySelector(`#scene-timer-${'startingSoon'}`);
        if(!el) return;
        let target = state.scenes?.['startingSoon']?.targetTime || (Date.now() + 300000);
        this.timer = setInterval(() => {
            const diff = Math.max(0, target - Date.now());
            const m = Math.floor(diff / 60000).toString().padStart(2, '0');
            const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
            el.textContent = `${m}:${s}`;
            if(diff === 0) clearInterval(this.timer);
        }, 1000);
    }
    async exit() {
        if(this.timer) clearInterval(this.timer);
        await super.exit();
    }
    
}
