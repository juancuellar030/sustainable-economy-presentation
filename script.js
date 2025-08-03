document.addEventListener("DOMContentLoaded", function() {
    const layers = document.querySelectorAll('.bg-layer');
    let currentLayer = 0;

    function changeLayer() {
        layers[currentLayer].style.opacity = 0;
        currentLayer = (currentLayer + 1) % layers.length;
        layers[currentLayer].style.opacity = 1;
    }

    setInterval(changeLayer, 5000);
});
