import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; top: 350px; left: 40px;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const title = config.title || 'Scan to Donate';
        return `<div style="padding: 20px; background: var(--theme-color-text); color: var(--theme-color-primary); border-radius: var(--theme-metric-borderRadius); text-align: center; width: 150px; box-shadow: var(--theme-metric-shadowLg);">
            <div style="font-weight: bold; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.2;">${title}</div>
            <div style="width: 100%; aspect-ratio: 1; background: var(--theme-color-primary); display: flex; justify-content: center; align-items: center; border-radius: 4px;">
                <svg viewBox="0 0 100 100" width="80" height="80"><path d="M10,10 h30 v30 h-30 z M60,10 h30 v30 h-30 z M10,60 h30 v30 h-30 z M60,60 h10 v10 h-10 z M80,80 h10 v10 h-10 z" fill="currentColor"/></svg>
            </div>
        </div>`;
    }
    
    
    
        
}
