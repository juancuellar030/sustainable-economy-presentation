document.addEventListener("DOMContentLoaded", function() {

    const slides = [
        'slide2.html', 'slide3.html', 'slide4.html', 'slide5.html', 'slide6.html',
        'slide7.html', 'slide8.html', 'slide9.html'
    ];

    let currentIndex = -1;

    const startButton = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const introContainer = document.getElementById('intro-container');
    const presentationContainer = document.getElementById('presentation-container');
    const navContainer = document.getElementById('nav-container');
    let iframe = null;

    // --- NEW: Music Elements ---
    const music = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle-btn');

    // --- Event Listeners ---
    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        playClickSound();
        
        // Play music if it's the first time
        if (music && music.paused) {
            music.play();
            musicToggleBtn.classList.remove('music-off');
        }
        musicToggleBtn.style.display = 'block'; // Show the music button

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
        playClickSound();
        if (currentIndex >= slides.length - 1) {
            currentIndex = -1;
        } else {
            currentIndex++;
        }
        updateViewState();
    });

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        playClickSound();
        // This logic is now simpler and more robust
        if (currentIndex >= 0) {
            currentIndex--;
        }
        updateViewState();
    });
    
    // NEW: Music Toggle Listener
    musicToggleBtn.addEventListener('click', () => {
        playClickSound();
        if (music.paused) {
            music.play();
            musicToggleBtn.classList.remove('music-off');
        } else {
            music.pause();
            musicToggleBtn.classList.add('music-off');
        }
    });

    function updateViewState() {
        if (currentIndex === -1) {
            introContainer.style.display = 'flex';
            navContainer.style.display = 'none';
            if (iframe) {
                iframe.style.display = 'none';
                iframe.src = 'about:blank';
            }
            exitFullscreen();
        } else {
            introContainer.style.display = 'none';
            navContainer.style.display = 'flex';
            iframe.style.display = 'block';
            iframe.src = slides[currentIndex];
            
            // THE FIX IS HERE: Always show the 'Anterior' button on any slide.
            prevBtn.style.display = 'inline-block';
            
            nextBtn.textContent = (currentIndex >= slides.length - 1) ? 'Reiniciar' : 'Siguiente';
        }
    }

    // --- Fullscreen Functions ---

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
});

// --- THE FIX: Sound functions are now in the global scope ---
function playClickSound() {
    const clickSound = document.getElementById('audio-click');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.error("Error playing click sound:", e));
    }
}

function playCloseSound() {
    const closeSound = document.getElementById('audio-close');
    if (closeSound) {
        closeSound.currentTime = 0;
        closeSound.play().catch(e => console.error("Error playing close sound:", e));
    }
}
