// Variable query mapping cache for tracking system overlay elements
const mobilePopup = document.getElementById('mobile-popup');
const rotateWarning = document.getElementById('rotate-warning');
const mainCanvas = document.getElementById('main-canvas');
const drumsAudio = document.getElementById('drums-audio');

let currentScale = 0;
let idleTimer = null;

// DEVICE MEMORY LOADING SETUP: Recalls saved state selection straight on page boot
document.addEventListener("DOMContentLoaded", () => {
    const savedState = localStorage.getItem("active_canvas_state");
    if (savedState) {
        mainCanvas.className = `landing-container ${savedState}`;
    }
    
    // Attaches tracking registers onto laptop mice and smartphone finger touch layouts
    window.addEventListener('mousemove', processPointerInput);
    window.addEventListener('touchmove', processPointerInput, { passive: false });
});

// Handles choice buttons on smartphones
function chooseMode(mode) {
    mobilePopup.style.display = 'none';
    if (mode === 'normal') {
        mainCanvas.classList.add('mobile-normal-mode');
    } else if (mode === 'thrill') {
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
    }
}

// Monitors real-time phone dimensions angles
function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        rotateWarning.style.display = 'flex';
    } else {
        rotateWarning.style.display = 'none';
    }
}

// THE DYNAMIC POSITION TRACKING DEVICE ENGINE
function processPointerInput(event) {
    // Normalizes input detection parameters whether driven via mouse coordinates or touchscreen frames
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    const rect = mainCanvas.getBoundingClientRect();
    const targetX = clientX - rect.left;
    const targetY = clientY - rect.top;

    // Forces mask scale overlay dimensions open while cursor coordinates track
    currentScale = 1;
    mainCanvas.style.setProperty('--mask-scale', currentScale);
    mainCanvas.style.setProperty('--mask-x', `${targetX}px`);
    mainCanvas.style.setProperty('--mask-y', `${targetY}px`);

    // Refreshes the idle countdown loop tracker on active movement
    clearTimeout(idleTimer);
    idleTimer = setTimeout(initiateMaskFade, 1000);
}

// Smoothly dissolves the mask layout if interaction remains dead for 5 seconds
function initiateMaskFade() {
    let fadeInterval = setInterval(() => {
        if (currentScale > 0) {
            currentScale -= 0.05;
            if (currentScale < 0) currentScale = 0;
            mainCanvas.style.setProperty('--mask-scale', currentScale);
        } else {
            clearInterval(fadeInterval);
        }
    }, 20);
}

// THE PERMANENT TRANSFORMATION EXECUTION MATRIX
function toggleTransformation() {
    // Rewinds sound track head pointer and fires play engine response cues
    drumsAudio.currentTime = 0;
    drumsAudio.play().catch(() => console.log("Audio waiting for user interface interaction permissions."));

    let nextState = "";
    if (mainCanvas.classList.contains('state-one')) {
        mainCanvas.classList.remove('state-one');
        mainCanvas.classList.add('state-two');
        nextState = "state-two";
    } else {
        mainCanvas.classList.remove('state-two');
        mainCanvas.classList.add('state-one');
        nextState = "state-one";
    }

    // Safely caches state selections in browser records so page refreshing preserves state position
    localStorage.setItem("active_canvas_state", nextState);
}