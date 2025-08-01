// script.js

// Optional: Add any future JavaScript interactions here
// For now, navigation is handled by inline onclick attributes

// Example: Keyboard navigation (Arrow keys)
document.addEventListener('keydown', function(event) {
    const currentSlide = parseInt(window.location.pathname.split('slide')[1]?.split('.')[0]) || 1;
    if (event.key === 'ArrowLeft') {
        if (currentSlide > 1) {
            window.location.href = `slide${currentSlide - 1}.html`;
        } else if (currentSlide === 1) {
             window.location.href = `index.html`;
        }
    } else if (event.key === 'ArrowRight') {
         if (currentSlide < 9) {
            window.location.href = `slide${currentSlide + 1}.html`;
        }
    }
});
