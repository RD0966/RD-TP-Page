// Cache references mapping directly to specific structural HTML interface components nodes
const mobilePopup = document.getElementById('mobile-popup');
const rotateWarning = document.getElementById('rotate-warning');
const mainCanvas = document.getElementById('main-canvas');
const drumsAudio = document.getElementById('drums-audio');
const canvas = document.getElementById('fluid-canvas');
const ctx = canvas.getContext('2d');

// Historical tracking array collection logging previous cursor coordinates to draw the fluid track line path
let pointsHistoryArray = [];
// UPPER TAIL LENGTH CONSTRAINT LIMIT: Controls maximum thickness lengths parameter for the snakes path trail (Increase to elongate snake)
const maxPointsLimit = 35; 

// Tracks visibility opacity levels scale assigned over the canvas drawing overlay layer 
let maskOpacityWeight = 0;
// Timer tracker instance tracking pointer pause durations when mouse or touch action goes dead static
let idleIntervalHook = null;

// Audio Auto-play Helper: Tracks if the document audio stream has been unlocked by user movement gestures
let isAudioUnlocked = false;

// Instantiates image cache object shell layer matching alternate transformed image asset background graphics
let transformedImageSource = new Image();
transformedImageSource.src = 'https://i.pinimg.com/736x/e5/00/9f/e5009fb73c81b51373a5c00202938635.jpg';

// Instantiates image cache object shell layer matching primary starting baseline default background graphics
let defaultImageSource = new Image();
defaultImageSource.src = 'https://i.pinimg.com/736x/19/d2/40/19d240f66e85c2f870f59dabc61f6413.jpg';

// APP APPLICATION INITIALIZATION INITIALIZER: Runs code immediately upon loading complete page structure frameworks
document.addEventListener("DOMContentLoaded", () => {
    // PERSISTENCE PROTOCOL: Scans browser storage history to determine if site was closed on state-one or state-two view
    const savedViewState = localStorage.getItem("active_canvas_state");
    if (savedViewState) {
        mainCanvas.className = `landing-container ${savedViewState}`;
    }
    
    // Calculates initial rendering space constraints to match exact physical window display pixels width metrics
    refreshFluidCanvasDimensions();
    // Instantly scales the canvas resolution grid if device frame windows shift scale or stretch bounds
    window.addEventListener('resize', refreshFluidCanvasDimensions);

    // Binds coordinates tracking logic routines directly to mouse tracks handles and mobile touch screen swipe tracks
    window.addEventListener('mousemove', parseMovementCoordinates);
    window.addEventListener('touchmove', parseMovementCoordinates, { passive: false });

    // Activates the core painter loops ticking continuously at 60 frames per second inside graphics processor pipelines
    triggerCanvasPainterEngine();
});

// Syncs digital canvas resolution limits with active window workspace dimensions profiles parameters
function refreshFluidCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Handles user strategy selection choices on mobile smartphone device layouts
function chooseMode(mode) {
    mobilePopup.style.display = 'none';
    if (mode === 'normal') {
        mainCanvas.classList.add('mobile-normal-mode');
    } else if (mode === 'thrill') {
        runDevicePositionCheck();
        window.addEventListener('resize', runDevicePositionCheck);
    }
}

// Portrait/Landscape tilt calculator filtering vertical orientation alignment faults profiles on phones
function runDevicePositionCheck() {
    if (window.innerHeight > window.innerWidth) {
        rotateWarning.style.display = 'flex';
    } else {
        rotateWarning.style.display = 'none';
    }
}

// POINTER COORDINATES CAPTURE ENGINE: Normalizes touch and mouse data straight into track arrays arrays logs
function parseMovementCoordinates(event) {
    // AUDIO UNLOCK FUNCTION: Unlocks audio context on very first movement gesture, complying with modern browser auto-play security
    if (!isAudioUnlocked) {
        drumsAudio.play().catch(() => console.log("Audio pipeline awaiting permission clear."));
        isAudioUnlocked = true;
    }

    // Normalizes point processing extraction loops across computer mouse tracks vectors and phone swipe fingers tracks
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    const surfaceBoxBounds = mainCanvas.getBoundingClientRect();
    const normalizedX = clientX - surfaceBoxBounds.left;
    const normalizedY = clientY - surfaceBoxBounds.top;

    // Forces visual masking tracks back into 100% full alpha visibility properties when mouse is actively tracked
    maskOpacityWeight = 1;

    // Appends freshly logged screen pointer coordinates straight onto historical track array paths records
    // Modify 'baseRadius' below to thicken or thin out the base circular brush thickness size footprint
    pointsHistoryArray.push({ x: normalizedX, y: normalizedY, baseRadius: 105 });

    // Safely crops down older aging arrays logs indices if limits size exceeds your length max setting thresholds
    if (pointsHistoryArray.length > maxPointsLimit) {
        pointsHistoryArray.shift();
    }

    // Halts background countdown processing timelines loops while motion tracking registers active update changes
    clearTimeout(idleIntervalHook);
    // Commences automated dissolution countdown loops sequence if pointer interaction drops dead silent for 5 seconds
    idleIntervalHook = setTimeout(() => {
        executeFadeOutSequence();
    }, 1000);
}

// Automated alpha reduction routine looping metrics down slowly to smoothly dissolve paths drawings traces
function executeFadeOutSequence() {
    let loopFadeTimer = setInterval(() => {
        if (maskOpacityWeight > 0) {
            maskOpacityWeight -= 0.05;
            if (maskOpacityWeight < 0) maskOpacityWeight = 0;
        } else {
            clearInterval(loopFadeTimer);
        }
    }, 30);
}

// 60FPS GRAPHICS REFRESH ENGINE LOOP: Links coordinate dots arrays and applies composite clip-mask constraints
function triggerCanvasPainterEngine() {
    // Wipes drawing canvas frames pixel data buffers cleanly transparent on every loop turn iteration updates
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Only commence custom mask image rendering calculations if historical tracing records contain active track data
    if (pointsHistoryArray.length > 0 && maskOpacityWeight > 0) {
        ctx.save();
        
        // Establishes general visual opacity parameter values according to active fade tracking measurements weights
        ctx.globalAlpha = maskOpacityWeight;

        // Sequence calculation path loop creating the slithering liquid snake tail tapering profile effect
        for (let i = 0; i < pointsHistoryArray.length; i++) {
            const pointData = pointsHistoryArray[i];
            
            // Tapering calculation algorithm: shrinks radius size downward near tail arrays indices to model a liquid look
            const liquidTaperedRadius = pointData.baseRadius * (i / pointsHistoryArray.length);

            ctx.beginPath();
            // Maps out vector circular nodes frames over historical path track coordinates elements
            ctx.arc(pointData.x, pointData.y, liquidTaperedRadius, 0, Math.PI * 2);
            ctx.closePath();
            // Sets fill color instructions drawing out solid shape outlines to outline your masked canvas bounds fields
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }

        // CRITICAL REVEALING COMPOSITE LAYER HOOK: Restricts all incoming drawing pixel outputs inside the snake path shape borders lines
        ctx.globalCompositeOperation = 'source-in';

        // Scans current screen view classification setups to draw the alternate underlying graphic inside your trail mask track lines
        if (mainCanvas.classList.contains('state-one')) {
            // While base layout views image 1, the moving liquid snake track reveal draws out image 2 image content surface
            ctx.drawImage(transformedImageSource, 0, 0, canvas.width, canvas.height);
        } else {
            // While base layout views image 2, the moving liquid snake track reveal draws out image 1 image content surface
            ctx.drawImage(defaultImageSource, 0, 0, canvas.width, canvas.height);
        }

        ctx.restore();
    }

    // Links up directly with your browser native screen monitors updates cycle loop to fire logic again on next animation frame frame tick
    requestAnimationFrame(triggerCanvasPainterEngine);
}

// PERMANENT SYSTEM SWITCH SELECTION TRACKER METHOD: Swaps view configurations structures and records data straight to local storage
function toggleTransformation() {
    // Rewinds target audio tracking playback pointer head back down to initial zero index index baseline marker
    drumsAudio.currentTime = 0;
    // Activates audio element track cue component audio loops signals
    drumsAudio.play().catch(() => console.log("Audio pipeline waiting interaction clear parameters gesture tokens."));

    let targetNextStateIndexStr = "";
    // Evaluates component classification flags string to toggle view modes cleanly back and forth across page spaces
    if (mainCanvas.classList.contains('state-one')) {
        mainCanvas.classList.remove('state-one');
        mainCanvas.classList.add('state-two');
        targetNextStateIndexStr = "state-two";
    } else {
        mainCanvas.classList.remove('state-two');
        mainCanvas.classList.add('state-one');
        targetNextStateIndexStr = "state-one";
    }

    // Wipes out old canvas drawing vectors arrays clean immediately upon swap to prevent drawing trail visual artifacts bleeding lags glitches
    pointsHistoryArray = [];

    // PERSISTENCE PROTOCOL UPDATE: Writes target status choice data variables into browser local cache memory variables files registry
    localStorage.setItem("active_canvas_state", targetNextStateIndexStr);
}
