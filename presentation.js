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
    let iframe = null;

    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        enterFullscreen();
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
            currentIndex = -1;
        } else {
            currentIndex++;
        }
        updateViewState();
    });

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex >= 0) { // Check if we are on a slide
            currentIndex--;
        }
        updateViewState();
    });

    function updateViewState() {
        if (currentIndex === -1) {
            // STATE: Show Intro
            introContainer.style.display = 'flex';
            navContainer.style.display = 'none';
            if (iframe) {
                iframe.style.display = 'none';
                iframe.src = 'about:blank'; // Clear the iframe to stop animations/sound
            }
            exitFullscreen();
        } else {
            // STATE: Show Slide
            introContainer.style.display = 'none';
            navContainer.style.display = 'flex';
            iframe.style.display = 'block';
            iframe.src = slides[currentIndex];

            // THE FIX: "Anterior" button is now always visible when a slide is active.
            prevBtn.style.display = 'inline-block';

            if (currentIndex >= slides.length - 1) {
                nextBtn.textContent = 'Reiniciar';
            } else {
                nextBtn.textContent = 'Siguiente';
            }
        }
    }

    function enterFullscreen() {
        const docElement = document.documentElement;
        if (docElement.requestFullscreen) docElement.requestFullscreen();
        else if (docElement.mozRequestFullScreen) docElement.mozRequestFullScreen();
        else if (docElement.webkitRequestFullscreen) docElement.webkitRequestFullscreen();
        else if (docElement.msRequestFullscreen) docElement.msRequestFullscreen();
    }

    function exitFullscreen() {
        if (document.fullscreenElement) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    }

    // --- Sound Effect Logic ---
    function playClickSound() {
        const clickSound = document.getElementById('audio-click');
        if (clickSound) {
            clickSound.currentTime = 0; // Rewind to the start
            clickSound.play();
        }
    }
    
    function playCloseSound() {
        const closeSound = document.getElementById('audio-close');
        if (closeSound) {
            closeSound.currentTime = 0; // Rewind to the start
            closeSound.play();
        }
    }
});
