// overlay/scenes/BaseScene.js

export default class BaseScene {
    constructor(container) {
        this.container = container;
        this.el = document.createElement('div');
        this.el.className = 'scene transition-fade-enter';
    }

    getHTML(state) {
        return `<div>Base Scene</div>`; // Override
    }

    async enter(state) {
        this.el.innerHTML = this.getHTML(state);
        this.container.appendChild(this.el);
        
        // Trigger CSS reflow
        void this.el.offsetWidth;
        
        this.el.classList.add('transition-fade-enter-active');
        
        // Wait for animation
        await new Promise(r => setTimeout(r, 800)); // matches var(--theme-anim-durationSlow)
    }

    update(state) {
        // Optional override to update DOM elements directly without re-entering
    }

    async exit() {
        this.el.classList.remove('transition-fade-enter', 'transition-fade-enter-active');
        this.el.classList.add('transition-fade-exit');
        
        // Trigger reflow
        void this.el.offsetWidth;
        
        this.el.classList.add('transition-fade-exit-active');
        
        await new Promise(r => setTimeout(r, 800));
        this.el.remove();
    }
}
