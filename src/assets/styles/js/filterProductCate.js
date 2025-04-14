document.addEventListener('DOMContentLoaded', function () {
    const starRating = document.querySelector('.star-rating');
    const stars = starRating.querySelectorAll('.star');

    stars.forEach(star => {
      star.addEventListener('mouseover', function () {
        const value = this.getAttribute('data-value');
        stars.forEach(s => {
          if (s.getAttribute('data-value') <= value) {
            s.classList.add('hover');
          } else {
            s.classList.remove('hover');
          }
        });
      });
      star.addEventListener('mouseout', function () {
        stars.forEach(s => s.classList.remove('hover'));
      });
      star.addEventListener('click', function () {
        const value = this.getAttribute('data-value');
        starRating.setAttribute('data-rating', value);
        stars.forEach(s => {
          if (s.getAttribute('data-value') <= value) {
            s.classList.add('selected');
          } else {
            s.classList.remove('selected');
          }
        });
      });
    });
    document.querySelector('.reset-btn').addEventListener('click', function () {
      starRating.setAttribute('data-rating', '0');
      stars.forEach(s => s.classList.remove('selected'));
    });
  });