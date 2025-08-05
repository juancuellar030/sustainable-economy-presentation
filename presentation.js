document.addEventListener("DOMContentLoaded", function() {

    const slides = [
        'slide2.html',
        'slide3.html',
        'slide4.html',
        'slide5.html',
        'slide6.html',
        'slide7.html',
        'slide8.html',
        'slide9.html'
    ];

    let currentIndex = -1; // -1 represents the intro card screen

    const startButton = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const introContainer = document.getElementById('intro-container');
    const presentationContainer = document.getElementById('presentation-container');
    const navContainer = document.getElementById('nav-container');
    let iframe = null; // We will store the iframe reference here

    // --- Actions ---

    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        enterFullscreen();
        
        // Create the iframe only once
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'slide-frame';
            presentationContainer.appendChild(iframe);
        }
        
        currentIndex = 0;
        updateViewState();
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex >= slides.length - 1) {
            currentIndex = -1; // "Reiniciar" goes back to the intro card
        } else {
            currentIndex++;
        }
        updateViewState();
    });

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex > -1) { // Only decrement if we are on a slide
            currentIndex--;
        }
        updateViewState();
    });

    // --- View State Controller ---

    function updateViewState() {
        // This single function controls what is visible based on the currentIndex

        if (currentIndex === -1) {
            // STATE: Intro Card is visible
            introContainer.style.display = 'flex';
            navContainer.style.display = 'none'; // Hide the main navigation
            if (iframe) {
                iframe.style.display = 'none'; // Hide the iframe content
            }
            exitFullscreen(); // Exit fullscreen when back on the intro page
        } else {
            // STATE: A slide is visible inside the iframe
            introContainer.style.display = 'none';
            navContainer.style.display = 'flex'; // Show the main navigation
            
            iframe.style.display = 'block'; // Show the iframe
            iframe.src = slides[currentIndex]; // Load the correct slide URL

            // Update the state of the navigation buttons
            prevBtn.style.display = (currentIndex <= 0) ? 'none' : 'inline-block';

            if (currentIndex >= slides.length - 1) {
                nextBtn.textContent = 'Reiniciar';
            } else {
                nextBtn.textContent = 'Siguiente';
            }
        }
    }

    // --- Fullscreen Utilities ---

    function enterFullscreen() {
        const docElement = document.documentElement;
        if (docElement.requestFullscreen) docElement.requestFullscreen();
        else if (docElement.mozRequestFullScreen) docElement.mozRequestFullScreen();
        else if (docElement.webkitRequestFullscreen) docElement.webkitRequestFullscreen();
        else if (docElement.msRequestFullscreen) docElement.msRequestFullscreen();
    }

    function exitFullscreen() {
        if (document.fullscreenElement) { // Only exit if we are actually in fullscreen
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    }
});
