const container = document.getElementById('background');
const balls = document.querySelectorAll('.ball');
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;
balls.forEach(ball => {
    ball.style.left = Math.random() * (containerWidth - ball.offsetWidth) + 'px';
    ball.style.top = Math.random() * (containerHeight - ball.offsetHeight) + 'px';

    ball.vx = (Math.random() - 0.5) * 4;
    ball.vy = (Math.random() - 0.5) * 4;
});

function animate() {
    balls.forEach(ball => {
        let posX = parseFloat(ball.style.left) || 0;
        let posY = parseFloat(ball.style.top) || 0;
        posX += ball.vx;
        posY += ball.vy;
        if (posX + ball.offsetWidth > containerWidth || posX < 0) {
            ball.vx = -ball.vx; 
        }
        if (posY + ball.offsetHeight > containerHeight || posY < 0) {
            ball.vy = -ball.vy; 
        }
        posX = Math.max(0, Math.min(posX, containerWidth - ball.offsetWidth));
        posY = Math.max(0, Math.min(posY, containerHeight - ball.offsetHeight));
        ball.style.left = posX + 'px';
        ball.style.top = posY + 'px';
    });

    requestAnimationFrame(animate);
}

animate();