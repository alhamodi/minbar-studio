import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.countdown?.title || 'Stream Starts In';
        return `<div class="scene-layout center-focus geometric-bg">
            <div class="content-box solid-panel flip-in">
                <h2 class="scene-title">${title}</h2>
                <div class="countdown-timer massive-text" id="scene-timer-countdown">05:00</div>
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
        const el = this.el.querySelector(`#scene-timer-${'countdown'}`);
        if(!el) return;
        let target = state.scenes?.['countdown']?.targetTime || (Date.now() + 300000);
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
