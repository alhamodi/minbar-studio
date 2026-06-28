import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; top: 60px; left: 50%; transform: translateX(-50%);">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const text = config.text || 'ANNUAL CONFERENCE 2026';
        return `<div style="padding: 15px 50px; background: rgba(0,0,0,0.6); border-radius: 50px; border: 1px solid var(--theme-color-accent); text-align: center; box-shadow: var(--theme-metric-shadowLg);">
            <h2 style="margin:0; font-size: 2.2rem; font-family: var(--theme-font-heading); color: var(--theme-color-text); letter-spacing: 4px;">${text}</h2>
        </div>`;
    }
    
    
    
        
}
