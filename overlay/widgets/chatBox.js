import BaseWidget from './BaseWidget.js';

export default class extends BaseWidget {
    getHTML(config) {
        return `<div style="position: absolute; top: 50%; right: 40px; transform: translateY(-50%);">
            ${this.renderInner(config)}
        </div>`;
    }
    
    renderInner(config) {
        
        const messages = config.messages || [
            { user: 'User1', text: 'Hello stream!' },
            { user: 'User2', text: 'This looks amazing.' }
        ];
        let msgsHtml = messages.map(m => `<div style="margin-bottom: 12px; line-height: 1.4;">
                <span style="color: var(--theme-color-accent); font-weight: bold; margin-right: 8px;">${m.user}:</span>
                <span style="color: var(--theme-color-text);">${m.text}</span>
            </div>`).join('');
        return `<div style="width: 350px; height: 500px; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--theme-metric-borderRadius); padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden;">
            <div style="border-bottom: 2px solid var(--theme-color-accent); padding-bottom: 10px; margin-bottom: 15px; font-weight: bold; font-size: 1.2rem;">Live Chat</div>
            <div class="chat-messages" style="flex: 1; overflow-y: hidden; display: flex; flex-direction: column; justify-content: flex-end;">
                ${msgsHtml}
            </div>
        </div>`;
    }
    
    
    
        
}
