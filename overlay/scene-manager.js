// overlay/scene-manager.js

export class SceneManager {
    constructor(container) {
        this.container = container;
        this.currentSceneId = null;
        this.currentSceneInstance = null;
        this.loadedScenes = {}; // Cache of modules
    }

    async switchScene(sceneId, globalState) {
        if (this.currentSceneId === sceneId) {
            // Just update state if scene is the same
            if (this.currentSceneInstance && this.currentSceneInstance.update) {
                this.currentSceneInstance.update(globalState);
            }
            return;
        }

        console.log(`Switching scene to: ${sceneId}`);
        
        // 1. Exit current scene
        if (this.currentSceneInstance) {
            await this.currentSceneInstance.exit();
            this.container.innerHTML = '';
        }

        this.currentSceneId = sceneId;

        // 2. Load module dynamically
        let SceneModule;
        if (this.loadedScenes[sceneId]) {
            SceneModule = this.loadedScenes[sceneId];
        } else {
            try {
                const module = await import(`/overlay/scenes/${sceneId}.js`);
                SceneModule = module.default;
                this.loadedScenes[sceneId] = SceneModule;
            } catch (e) {
                console.error(`Failed to load scene ${sceneId}:`, e);
                return;
            }
        }

        // 3. Instantiate and Enter
        this.currentSceneInstance = new SceneModule(this.container);
        await this.currentSceneInstance.enter(globalState);
    }
}
