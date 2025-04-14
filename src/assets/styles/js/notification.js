document.addEventListener('DOMContentLoaded', function () {
    const notificationCards = document.querySelectorAll('.notification-card');
    notificationCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 200); 
    });
    const closeButtons = document.querySelectorAll('.notification-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const card = this.parentElement;
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 500); 
      });
    });
  });