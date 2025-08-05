document.addEventListener("DOMContentLoaded", function() {

    // Note: The first slide is now the intro content, not a separate file.
    // The presentation itself starts at slide2.html.
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

    let currentIndex = -1; // -1 means we are on the intro screen

    const startButton = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const introContainer = document.getElementById('intro-container');
    const presentationContainer = document.getElementById('presentation-container');
    const navContainer = document.getElementById('nav-container');

    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        enterFullscreen();

        // Hide the intro and show the presentation layout
        introContainer.style.display = 'none';
        navContainer.style.display = 'flex';
        document.body.classList.add('presentation-view'); // Optional class to change styles

        // Create the iframe and load the first slide
        const iframe = document.createElement('iframe');
        iframe.id = 'slide-frame';
        presentationContainer.appendChild(iframe);
        
        // Start with the first slide
        currentIndex = 0;
        loadSlide(currentIndex);
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex >= slides.length - 1) {
            // Restart logic
            window.location.reload(); // Easiest way to get back to the start
        } else {
            currentIndex++;
            loadSlide(currentIndex);
        }
    });

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex <= 0) {
            // Can't go back further
            return;
        }
        currentIndex--;
        loadSlide(currentIndex);
    });

    function loadSlide(index) {
        const iframe = document.getElementById('slide-frame');
        if (iframe) {
            iframe.src = slides[index];
        }

        // Update button states
        prevBtn.style.display = (index <= 0) ? 'none' : 'inline-block';

        if (index >= slides.length - 1) {
            nextBtn.textContent = 'Reiniciar';
        } else {
            nextBtn.textContent = 'Siguiente';
        }
    }

    function enterFullscreen() {
        const docElement = document.documentElement;
        if (docElement.requestFullscreen) docElement.requestFullscreen();
        else if (docElement.mozRequestFullScreen) docElement.mozRequestFullScreen();
        else if (docElement.webkitRequestFullscreen) docElement.webkitRequestFullscreen();
        else if (docElement.msRequestFullscreen) docElement.msRequestFullscreen();
    }
});
