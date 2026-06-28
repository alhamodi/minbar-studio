import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; top: 40px; right: 40px;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        return `<div class="widget-clock" style="padding: 15px 25px; background: rgba(10,25,47,0.7); backdrop-filter: blur(10px); border-radius: var(--theme-metric-borderRadius); border-left: 4px solid var(--theme-color-accent); font-size: 2rem; font-weight: bold; font-variant-numeric: tabular-nums; box-shadow: var(--theme-metric-shadowSm);">
            <span class="time-display">00:00</span>
        </div>`;
    }
    
    
    
    onMount() { this.startClock(); }
    onUpdate() { this.startClock(); }
    onUnmount() { clearInterval(this.timer); }
    startClock() {
        if(this.timer) clearInterval(this.timer);
        const el = this.container.querySelector('.time-display');
        const format = this.state.format || '24h';
        this.timer = setInterval(() => {
            const d = new Date();
            el.textContent = format === '12h' ? d.toLocaleTimeString('en-US') : d.toLocaleTimeString('en-GB');
        }, 1000);
    }
        
}
