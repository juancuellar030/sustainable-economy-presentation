document.addEventListener("DOMContentLoaded", function() {
    
    // --- PART 1: This runs on EVERY slide ---
    // On page load, check if we're supposed to be in fullscreen mode.
    if (sessionStorage.getItem('fullscreen') === 'true') {
        // Use a small timeout to ensure the page is ready before requesting.
        setTimeout(() => {
            enterFullscreen();
        }, 50); // 50ms is very fast, but gives the browser a moment to breathe.
    }

    // --- PART 2: This ONLY runs on the first slide (index.html) ---
    // It looks for the button with id="start-btn".
    const startButton = document.getElementById('start-btn');
    if (startButton) {
        startButton.addEventListener('click', function(event) {
            event.preventDefault(); // Stop it from navigating immediately.
            
            // Set the "memory" that we want to be in fullscreen mode.
            sessionStorage.setItem('fullscreen', 'true');
            
            // Enter fullscreen and then go to the next slide.
            enterFullscreen();
            
            // Give the browser a moment before navigating.
            setTimeout(() => {
                window.location.href = startButton.href;
            }, 200);
        });
    }

    // A reusable function to enter fullscreen across all browsers.
    function enterFullscreen() {
        const docElement = document.documentElement;
        if (docElement.requestFullscreen) docElement.requestFullscreen();
        else if (docElement.mozRequestFullScreen) docElement.mozRequestFullScreen(); // Firefox
        else if (docElement.webkitRequestFullscreen) docElement.webkitRequestFullscreen(); // Chrome, Safari
        else if (docElement.msRequestFullscreen) docElement.msRequestFullscreen(); // Edge
    }

    // --- Optional: Clean up when the session ends ---
    // When the user closes the tab, clear the flag.
    window.addEventListener('beforeunload', () => {
        sessionStorage.removeItem('fullscreen');
    });
});
