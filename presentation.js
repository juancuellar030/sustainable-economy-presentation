document.addEventListener("DOMContentLoaded", function() {

    const slides = [
        'index.html',
        'slide2.html',
        'slide3.html',
        'slide4.html',
        'slide5.html',
        'slide6.html',
        'slide7.html',
        'slide8.html',
        'slide9.html'
    ];

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = slides.indexOf(currentPage);

    // --- Fullscreen Logic ---
    const startButton = document.getElementById('start-btn');
    if (startButton) {
        startButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the link from navigating immediately

            // This function will handle the navigation
            const navigateToNextSlide = () => {
                // Remove the event listener to avoid it firing again
                document.removeEventListener('fullscreenchange', navigateToNextSlide);
                window.location.href = startButton.href;
            };

            // Listen for the 'fullscreenchange' event
            document.addEventListener('fullscreenchange', navigateToNextSlide);

            // Request to enter fullscreen
            enterFullscreen();
        });
    }

    // --- Smart Navigation Logic ---
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (nextBtn) {
        if (currentIndex >= slides.length - 1) {
            nextBtn.textContent = 'Reiniciar';
            nextBtn.href = slides[0];
        } else {
            nextBtn.href = slides[currentIndex + 1];
        }
    }

    if (prevBtn) {
        if (currentIndex <= 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.href = slides[currentIndex - 1];
        }
    }

    // --- Reusable Functions ---
    function enterFullscreen() {
        const docElement = document.documentElement;
        if (docElement.requestFullscreen) docElement.requestFullscreen();
        else if (docElement.mozRequestFullScreen) docElement.mozRequestFullScreen();
        else if (docElement.webkitRequestFullscreen) docElement.webkitRequestFullscreen();
        else if (docElement.msRequestFullscreen) docElement.msRequestFullscreen();
    }
});
