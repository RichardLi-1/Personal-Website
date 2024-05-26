let slideIndex = 0;

function showSlides(n) {
    let slides = document.querySelectorAll('.slide');
    let slidesWrapper = document.querySelector('.slides-wrapper');
    let numSlides = slides.length;

    slideIndex = (n + numSlides) % numSlides;

    slidesWrapper.style.transform = 'translateX(' + (-slideIndex * 100 / numSlides) + '%)';
}

function plusSlides(n) {
    showSlides(slideIndex + n);
}

// Initialize the first set of slides
showSlides(slideIndex);