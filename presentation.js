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
            
            // --- MODIFIED PART ---
            // When the iframe finishes loading a new slide, apply the ripple effect to its content
            iframe.onload = function() {
                const iframeDoc = iframe.contentWindow.document;
                const interactiveElements = iframeDoc.querySelectorAll('.button, .tbl-circle, .tab-item, .toggle-option');
                interactiveElements.forEach(elem => {
                    elem.addEventListener('click', createRipple);
                });
            };

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

        // --- NEW: Ripple Effect Function ---
    function createRipple(event) {
        const element = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        
        const rect = element.getBoundingClientRect();
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        
        circle.classList.add("ripple");
        
        const existingRipple = element.querySelector(".ripple");
        if (existingRipple) {
            existingRipple.remove();
        }
        
        element.appendChild(circle);

        // Clean up the ripple element after the animation ends
        setTimeout(() => {
            if (circle) circle.remove();
        }, 600); // Must match the animation duration in CSS
    }

    // Apply the effect to the main page buttons
    const mainPageButtons = document.querySelectorAll('#start-btn, #prev-btn, #next-btn');
    mainPageButtons.forEach(button => {
        button.addEventListener("click", createRipple);
    });
    
});
