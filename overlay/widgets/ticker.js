import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; bottom: 0; left: 0;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const text = config.text || 'Welcome to the broadcast. Thank you for tuning in.';
        return `<div style="width: 1920px; background: rgba(0,0,0,0.8); border-top: 2px solid var(--theme-color-accent); padding: 12px 0; overflow: hidden; white-space: nowrap; font-size: 1.4rem;">
            <div class="ticker-scroll" style="display: inline-block; padding-left: 100%;">
                <span>${text}</span>
            </div>
        </div>`;
    }
    
    
    
    onMount() {
        const el = this.container.querySelector('.ticker-scroll');
        el.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-100%)' }
        ], { duration: 25000, iterations: Infinity });
    }
        
}
