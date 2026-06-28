import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; bottom: 120px; left: 60px;">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const name = config.name || 'Guest Speaker';
        const title = config.title || 'Expert Panellist';
        return `<div style="display: flex; align-items: center; background: linear-gradient(90deg, var(--theme-color-primary) 0%, transparent 100%); padding: 25px 50px 25px 25px; border-left: 6px solid var(--theme-color-accent); border-radius: 4px; box-shadow: -10px 0 20px rgba(0,0,0,0.2);">
            <div style="width: 70px; height: 70px; color: var(--theme-color-accent); margin-right: 25px;">
                <svg viewBox="0 0 100 100"><polygon points="50,0 60,35 95,35 68,55 78,90 50,70 22,90 32,55 5,35 40,35" fill="currentColor"/></svg>
            </div>
            <div>
                <div style="font-size: 3rem; font-family: var(--theme-font-heading); font-weight: bold; text-transform: uppercase; line-height: 1.1;">${name}</div>
                <div style="font-size: 1.5rem; color: var(--theme-color-accent); font-weight: 300;">${title}</div>
            </div>
        </div>`;
    }
    
    
    
        
}
