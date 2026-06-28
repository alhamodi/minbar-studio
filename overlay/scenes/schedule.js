import BaseScene from './BaseScene.js';

export default class extends BaseScene {
    
    getHTML(state) {
        const title = state.scenes?.schedule?.title || 'Today\'s Schedule';
        const events = state.scenes?.schedule?.events || [
            { time: '10:00', name: 'Opening' },
            { time: '10:30', name: 'Guest Speaker' },
            { time: '12:00', name: 'Q&A' }
        ];
        const listHTML = events.map(e => `<li><span class="time" style="color:var(--theme-color-accent); font-weight:bold; margin-right:20px;">${e.time}</span> <span class="event" style="font-size:1.5rem;">${e.name}</span></li>`).join('');
        return `<div class="scene-layout timeline-focus">
            <div class="schedule-container slide-up" style="background: var(--theme-color-secondary); padding: 40px; border-radius: var(--theme-metric-borderRadius); border: 1px solid var(--theme-color-accent);">
                <h2 class="scene-title" style="font-size: 3rem; border-bottom: 2px solid var(--theme-color-accent); padding-bottom: 20px; margin-bottom: 30px;">${title}</h2>
                <ul class="timeline" style="list-style: none; padding: 0; display:flex; flex-direction:column; gap:20px;">
                    ${listHTML}
                </ul>
            </div>
        </div>`;
    }
    update(state) {}
    
    
}
