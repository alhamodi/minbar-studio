import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; top: 250px; left: 40px;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const current = config.current || 890;
        const target = config.target || 1000;
        const percent = Math.min(100, Math.round((current / target) * 100));
        return `<div style="padding: 15px; background: rgba(10,25,47,0.8); border: 1px solid var(--theme-color-accent); border-radius: var(--theme-metric-borderRadius); width: 280px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 600;">
                <span>Follower Goal</span>
                <span style="color: var(--theme-color-accent);">${current} / ${target}</span>
            </div>
            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                <div style="width: ${percent}%; height: 100%; background: var(--theme-color-accent); transition: width 1s ease-out;"></div>
            </div>
        </div>`;
    }
    
    
    
        
}
