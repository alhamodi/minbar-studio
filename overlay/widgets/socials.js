import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; top: 40px; left: 40px;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const handles = config.handles || [{platform: 'twitter', name: '@handle'}];
        let items = handles.map(h => `<div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: var(--theme-color-accent); font-weight: bold;">${h.platform.toUpperCase()[0]}</span>
                <span style="font-size: 1.2rem;">${h.name}</span>
            </div>`).join('');
        return `<div style="display: flex; gap: 30px; padding: 15px 30px; background: var(--theme-color-secondary); border-radius: 50px; box-shadow: var(--theme-metric-shadowSm); border: 1px solid rgba(255,255,255,0.1);">
            ${items}
        </div>`;
    }
    
    
    
        
}
