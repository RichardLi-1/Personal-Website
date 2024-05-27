console.log("from script file");

var head = document.getElementById('head');
var buttons = document.getElementsByClassName('buttons');
head.style.background = 'rgba(255, 165, 0, 0)';

document.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset;
    var rate = scrolled * -0.2; // Adjust the 0.5 to control the speed of the parallax effect
  
    document.querySelector('.sunset').style.backgroundPosition = 'center ' + rate + 'px';
  });
  
document.addEventListener("DOMContentLoaded", function() {
    var navbarTitle = document.getElementById('navbar-title');
    var bigTitle = document.getElementById('title-text');
    var scrollAmount = 320; // The amount of pixels scrolled after which to show the element
    
    window.addEventListener('scroll', function() {
        //---------------Scroll Down---------------//
        if (window.scrollY > scrollAmount) {
            navbarTitle.style.opacity = '1'; // Fade in
            bigTitle.style.opacity = '0'; // Fade out
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                // The device is set to light mode
                head.style.background = '#DDDDDD';
                Array.from(buttons).forEach(function(button) {
                    button.style.filter = 'brightness(5%)';
                });
            } else {
                // The device is set to dark mode or has no preference)
                head.style.background = 'linear-gradient(to bottom, #BC7FB6 0%, #70488D 100%)';
            }
        //----------------Scroll Up----------------//
        } else { //Scroll up
            navbarTitle.style.opacity = '0'; // Fade out
            bigTitle.style.opacity = '1'; // Fade in
            head.style.background = 'rgba(255, 165, 0, 0)';
            Array.from(buttons).forEach(function(button) {
                button.style.filter = 'brightness(100%)';
            });
        }
    });
});

function toggleMenu(){
  var menu = document.getElementById('menu');
  menu.classList.toggle('show');
}