function sideBarAnimation() {
    const slideBar = document.getElementById('side-bar');
    slideBar.classList.toggle('expanded');

    const hiddenElements = document.querySelectorAll('.hidden-text');
    hiddenElements.forEach(el => {
        if (slideBar.classList.contains('expanded')) {
            el.style.transition = 'opacity 0.7s ease-out';
            el.style.transitionDelay = '0.3s'; // Delay giống img2
            el.style.opacity = '1';
        } else {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s ease-out';
            el.style.transitionDelay = '0s';
        }
    });
}