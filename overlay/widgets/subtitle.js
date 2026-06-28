import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%);">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const text = config.text || 'This is an important subtitle or translation.';
        return `<div style="padding: 20px 40px; background: rgba(0,0,0,0.85); border-radius: 8px; border-top: 3px solid var(--theme-color-accent); text-align: center; max-width: 1200px;">
            <p style="margin:0; font-size: 2.5rem; line-height: 1.4;">${text}</p>
        </div>`;
    }
    
    
    
        
}
