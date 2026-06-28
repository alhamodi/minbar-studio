import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; top: 150px; right: 40px;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const title = config.title || 'STARTING IN';
        return `<div style="padding: 20px 40px; background: linear-gradient(135deg, var(--theme-color-primary), var(--theme-color-secondary)); border: 2px solid var(--theme-color-accent); border-radius: var(--theme-metric-borderRadius); text-align: center; box-shadow: var(--theme-metric-shadowLg);">
            <div style="font-size: 1.2rem; color: var(--theme-color-textMuted); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 5px;">${title}</div>
            <div class="countdown-display" style="font-size: 4rem; color: var(--theme-color-accent); font-weight: 300; font-variant-numeric: tabular-nums;">00:00</div>
        </div>`;
    }
    
    
    
    onMount() { this.startTimer(); }
    onUpdate() { this.startTimer(); }
    onUnmount() { clearInterval(this.timer); }
    startTimer() {
        if(this.timer) clearInterval(this.timer);
        let target = this.state.targetTime || (Date.now() + 300000);
        const el = this.container.querySelector('.countdown-display');
        this.timer = setInterval(() => {
            const diff = Math.max(0, target - Date.now());
            const m = Math.floor(diff / 60000).toString().padStart(2, '0');
            const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
            el.textContent = `${m}:${s}`;
            if(diff === 0) clearInterval(this.timer);
        }, 1000);
    }
        
}
