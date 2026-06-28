import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; bottom: 80px; right: 250px;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const current = config.current || 2500;
        const target = config.target || 5000;
        const title = config.title || 'Charity Drive';
        const percent = Math.min(100, Math.round((current / target) * 100));
        return `<div style="padding: 20px; background: var(--theme-color-secondary); border-radius: var(--theme-metric-borderRadius); width: 350px; box-shadow: var(--theme-metric-shadowSm);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-weight: bold; font-size: 1.2rem;">
                <span>${title}</span>
                <span style="color: var(--theme-color-accent);">$${current} / $${target}</span>
            </div>
            <div style="width: 100%; height: 12px; background: rgba(0,0,0,0.5); border-radius: 6px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);">
                <div style="width: ${percent}%; height: 100%; background: var(--theme-color-accent); transition: width 1s ease-out;"></div>
            </div>
        </div>`;
    }
    
    
    
        
}
