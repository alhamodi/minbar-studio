// overlay/widget-manager.js

export class WidgetManager {
    constructor(container) {
        this.container = container;
        this.loadedWidgets = {}; // Cache modules
        this.activeWidgets = {}; // Active instances
    }

    async updateWidgets(widgetsState) {
        for (const [widgetId, config] of Object.entries(widgetsState)) {
            if (config.show) {
                // Show/Update Widget
                if (!this.activeWidgets[widgetId]) {
                    await this.mountWidget(widgetId, config);
                } else {
                    this.activeWidgets[widgetId].update(config);
                }
            } else {
                // Hide/Unmount Widget
                if (this.activeWidgets[widgetId]) {
                    this.activeWidgets[widgetId].unmount();
                    delete this.activeWidgets[widgetId];
                }
            }
        }
    }

    async mountWidget(widgetId, config) {
        let WidgetModule;
        if (this.loadedWidgets[widgetId]) {
            WidgetModule = this.loadedWidgets[widgetId];
        } else {
            try {
                const module = await import(`/overlay/widgets/${widgetId}.js`);
                WidgetModule = module.default;
                this.loadedWidgets[widgetId] = WidgetModule;
            } catch (e) {
                console.warn(`Widget ${widgetId} module not found, skipping.`);
                return;
            }
        }

        // Create container
        const el = document.createElement('div');
        el.className = `widget widget-${widgetId}`;
        this.container.appendChild(el);

        const instance = new WidgetModule(el);
        await instance.mount(config);
        this.activeWidgets[widgetId] = instance;
    }
}
