function toggleSubBar() {
    const subbar = document.querySelector('.subbar-container');
    const circle = document.getElementById('circle');
    const logo = document.getElementById('logo');
    const closeIcon = document.getElementById('close-icon');
    const circleIcon = document.getElementById('circle-icon');

    if (subbar.classList.contains('hide')) {
        subbar.classList.remove('hide');
        closeIcon.classList.remove('hide');
        logo.classList.add('hide');
        circleIcon.classList.add('hide-close');
        
    } else {
        subbar.classList.add('hide');
        circle.classList.remove('active');
        closeIcon.classList.add('hide');
        logo.classList.remove('hide');
        circleIcon.classList.remove('hide-close');
    }
}