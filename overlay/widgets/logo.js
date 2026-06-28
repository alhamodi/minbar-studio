import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; bottom: 80px; right: 60px;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const url = config.url || '/assets/star-8.svg';
        return `<div style="width: 120px; height: 120px; opacity: 0.8; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
            <img src="${url}" style="width: 100%; height: 100%; object-fit: contain; color: var(--theme-color-accent);" alt="Logo">
        </div>`;
    }
    
    
    
        
}
