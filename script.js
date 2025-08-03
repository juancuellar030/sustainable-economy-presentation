document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-btn');
    const docElement = document.documentElement;
    let isFullscreenActive = false; // State to track if we are in fullscreen

    if (startButton) {
        // --- Main Click Handler for the Button ---
        startButton.addEventListener('click', function(event) {
            // ALWAYS prevent the default link navigation
            event.preventDefault();

            if (!isFullscreenActive) {
                // If we are NOT in fullscreen, this click should ENTER fullscreen
                if (docElement.requestFullscreen) {
                    docElement.requestFullscreen();
                } else if (docElement.mozRequestFullScreen) { // Firefox
                    docElement.mozRequestFullScreen();
                } else if (docElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
                    docElement.webkitRequestFullscreen();
                } else if (docElement.msRequestFullscreen) { // IE/Edge
                    docElement.msRequestFullscreen();
                }
            } else {
                // If we ARE already in fullscreen, this click should NAVIGATE
                window.location.href = startButton.href;
            }
        });

        // --- Listen for Fullscreen Change Events (e.g., user presses Esc) ---
        function handleFullscreenChange() {
            // Check if we are currently in fullscreen mode by seeing if an element is active
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                // We have successfully ENTERED fullscreen
                startButton.textContent = 'Siguiente'; // Change button text
                isFullscreenActive = true;
            } else {
                // We have EXITED fullscreen
                startButton.textContent = 'Empezar'; // Reset button text
                isFullscreenActive = false;
            }
        }

        // Add listeners for all browser types
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    }
});
