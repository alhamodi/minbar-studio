import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.intermission?.title || 'INTERMISSION';
        const badge = state.scenes?.intermission?.badge || 'We\'ll be right back';
        return `<div class="scene-layout split-screen">
            <div class="left-pane solid-bg slide-right">
                <h2 class="scene-title vertical-text">${title}</h2>
            </div>
            <div class="right-pane transparent slide-left delay-1">
                <div class="floating-badge">${badge}</div>
                <div class="countdown-timer float-anim" id="scene-timer-intermission">10:00</div>
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
        const el = this.el.querySelector(`#scene-timer-${'intermission'}`);
        if(!el) return;
        let target = state.scenes?.['intermission']?.targetTime || (Date.now() + 300000);
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
