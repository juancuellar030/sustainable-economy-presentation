document.addEventListener("DOMContentLoaded", function() {

    // --- The "Brain" of the Presentation ---
    // This array defines the correct order of all your slides.
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

    // --- Find the current page's place in the slide order ---
    const currentPage = window.location.pathname.split('/').pop();
    const currentIndex = slides.indexOf(currentPage);

    // --- Fullscreen Logic (from before) ---
    if (sessionStorage.getItem('fullscreen') === 'true') {
        setTimeout(() => enterFullscreen(), 50);
    }

    const startButton = document.getElementById('start-btn');
    if (startButton) {
        startButton.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.setItem('fullscreen', 'true');
            enterFullscreen();
            setTimeout(() => { window.location.href = startButton.href; }, 200);
        });
    }

    // --- NEW: Smart Navigation Logic ---
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    // Handle the "Next" button
    if (nextBtn) {
        if (currentIndex === slides.length - 1) {
            // On the last slide, make the button a "Restart" button
            nextBtn.textContent = 'Reiniciar';
            nextBtn.href = slides[0]; // Link back to the first slide
        } else {
            nextBtn.href = slides[currentIndex + 1];
        }
    }

    // Handle the "Previous" button
    if (prevBtn) {
        if (currentIndex <= 0) {
            // On the first slide (or if something goes wrong), hide the button
            prevBtn.style.display = 'none';
        } else {
            prevBtn.href = slides[currentIndex - 1];
        }
    }

    // A reusable function to enter fullscreen
    function enterFullscreen() {
        const docElement = document.documentElement;
        if (docElement.requestFullscreen) docElement.requestFullscreen();
        else if (docElement.mozRequestFullScreen) docElement.mozRequestFullScreen();
        else if (docElement.webkitRequestFullscreen) docElement.webkitRequestFullscreen();
        else if (docElement.msRequestFullscreen) docElement.msRequestFullscreen();
    }
    
    // Clean up sessionStorage when the tab is closed
    window.addEventListener('beforeunload', () => {
        sessionStorage.removeItem('fullscreen');
    });
});
