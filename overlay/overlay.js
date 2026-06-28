// Connect to local WebSocket Server
// Using dynamic host so it works across network if accessed via IP
const wsHost = window.location.hostname || 'localhost';
const wsPort = window.location.port || '3000';
let ws = null;

let countdownState = { active: false, targetTime: 0 };
let animationFrameId = null;

function connectWebSocket() {
    ws = new WebSocket(`ws://${wsHost}:${wsPort}`);

    ws.onopen = () => {
        console.log('Connected to OBS WebSocket Server');
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            handleCommand(data);
        } catch (e) {
            console.error('Failed to parse WebSocket message:', e);
        }
    };

    ws.onclose = () => {
        console.log('Disconnected. Reconnecting in 3 seconds...');
        setTimeout(connectWebSocket, 3000);
    };
    
    ws.onerror = (err) => {
        console.error('WebSocket Error:', err);
    };
}

function handleCommand(data) {
    switch (data.type) {
        case 'INIT_STATE':
            applyState(data.payload);
            break;
        case 'SET_SCENE':
            switchScene(data.payload.scene);
            break;
        case 'UPDATE_LOWER_THIRD':
            updateLowerThird(data.payload);
            break;
        case 'START_COUNTDOWN':
            startCountdown(data.payload.minutes);
            break;
        case 'STOP_COUNTDOWN':
            stopCountdown();
            break;
        case 'UPDATE_THEME':
            updateTheme(data.payload);
            break;
        case 'TOGGLE_FRAME':
            toggleFrame(data.payload.show);
            break;
    }
}

function applyState(state) {
    switchScene(state.scene);
    updateLowerThird(state.lowerThird);
    updateTheme(state.theme);
    
    if (state.countdown && state.countdown.active) {
        countdownState.targetTime = state.countdown.targetTime;
        countdownState.active = true;
        if (!animationFrameId) updateTimerLoop();
    }
}

function switchScene(sceneName) {
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(el => {
        el.classList.remove('visible');
        el.classList.add('hidden');
    });

    // Show selected scene
    const target = document.getElementById(`scene-${sceneName}`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('visible');
    }

    // Toggle global background for non-live scenes
    const globalBg = document.getElementById('global-bg');
    if (sceneName === 'live') {
        globalBg.classList.remove('visible');
        globalBg.classList.add('hidden');
    } else {
        globalBg.classList.remove('hidden');
        globalBg.classList.add('visible');
    }
}

function updateLowerThird(data) {
    if (data.name !== undefined) document.getElementById('lt-name').textContent = data.name;
    if (data.title !== undefined) document.getElementById('lt-title').textContent = data.title;
    
    if (data.show !== undefined) {
        const el = document.getElementById('lower-third');
        if (data.show) {
            el.classList.remove('hidden');
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
            el.classList.add('hidden');
        }
    }
}

function toggleFrame(show) {
    const el = document.getElementById('frame-overlay');
    if (show) {
        el.classList.remove('hidden');
        el.classList.add('visible');
    } else {
        el.classList.remove('visible');
        el.classList.add('hidden');
    }
}

function updateTheme(theme) {
    if (theme.primary) document.documentElement.style.setProperty('--primary-color', theme.primary);
    if (theme.secondary) document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    if (theme.accent) document.documentElement.style.setProperty('--accent-color', theme.accent);
}

// Timer Logic optimized for OBS using requestAnimationFrame
function startCountdown(minutes) {
    countdownState.targetTime = Date.now() + (minutes * 60000);
    countdownState.active = true;
    if (!animationFrameId) updateTimerLoop();
}

function stopCountdown() {
    countdownState.active = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    document.querySelectorAll('.countdown-timer').forEach(el => el.textContent = "00:00");
}

function updateTimerLoop() {
    if (!countdownState.active) return;
    
    const now = Date.now();
    const diff = countdownState.targetTime - now;

    if (diff <= 0) {
        stopCountdown();
        return;
    }

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Only update DOM if the second has changed (optimization)
    document.querySelectorAll('.countdown-timer').forEach(el => {
        if (el.textContent !== text) {
            el.textContent = text;
        }
    });

    animationFrameId = requestAnimationFrame(updateTimerLoop);
}

// Initialize
connectWebSocket();
