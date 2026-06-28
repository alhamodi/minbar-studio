// shared/theme-loader.js

export async function loadTheme(themeId) {
    try {
        const response = await fetch(`/themes/${themeId}.json`);
        if (!response.ok) throw new Error(`Theme ${themeId} not found`);
        
        const theme = await response.json();
        applyTheme(theme);
        return theme;
    } catch (e) {
        console.error('Failed to load theme:', e);
        return null;
    }
}

function applyTheme(theme) {
    const root = document.documentElement;

    // Apply Colors
    for (const [key, value] of Object.entries(theme.colors)) {
        root.style.setProperty(`--theme-color-${key}`, value);
    }

    // Apply Fonts
    for (const [key, value] of Object.entries(theme.fonts)) {
        root.style.setProperty(`--theme-font-${key}`, value);
    }

    // Apply Metrics
    for (const [key, value] of Object.entries(theme.metrics)) {
        root.style.setProperty(`--theme-metric-${key}`, value);
    }

    // Apply Animations
    for (const [key, value] of Object.entries(theme.animations)) {
        root.style.setProperty(`--theme-anim-${key}`, value);
    }
}
