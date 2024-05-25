let slideIndex = 0;

function showSlides(n) {
    let slides = document.querySelectorAll('.slide');
    let slidesWrapper = document.querySelector('.slides-wrapper');

    if (n >= slides.length - 2) {
        slideIndex = slides.length - 3;
    } else if (n < 0) {
        slideIndex = 0;
    } else {
        slideIndex = n;
    }

    slidesWrapper.style.transform = 'translateX(' + (-slideIndex * 33.33) + '%)';
}

function plusSlides(n) {
    showSlides(slideIndex + n);
}

// Initialize the first set of slides
showSlides(slideIndex);