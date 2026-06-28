
export default class BaseWidget {
    constructor(container) {
        this.container = container;
        this.state = {};
    }

    getHTML(config) {
        return '<div>Base Widget</div>';
    }

    async mount(config) {
        this.state = config;
        this.container.innerHTML = this.getHTML(config);
        this.container.classList.add('widget-enter');
        void this.container.offsetWidth; 
        this.container.classList.add('widget-enter-active');
        this.onMount();
    }

    update(config) {
        const changed = JSON.stringify(this.state) !== JSON.stringify(config);
        if (changed) {
            this.state = config;
            this.container.innerHTML = this.getHTML(config);
            this.onUpdate();
        }
    }

    unmount() {
        this.onUnmount();
        this.container.classList.remove('widget-enter', 'widget-enter-active');
        this.container.classList.add('widget-exit');
        void this.container.offsetWidth;
        this.container.classList.add('widget-exit-active');
        setTimeout(() => this.container.remove(), 800);
    }

    onMount() {}
    onUpdate() {}
    onUnmount() {}
}
