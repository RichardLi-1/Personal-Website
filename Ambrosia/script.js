console.log("from script file");

var head = document.getElementById('head');
var buttons = document.getElementsByClassName('buttons');

document.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset;
    var rate = scrolled * -0.2; // Adjust the 0.5 to control the speed of the parallax effect
  
    document.querySelector('.sunset').style.backgroundPosition = 'center ' + rate + 'px';
  });
  

function toggleMenu(){
  var menu = document.getElementById('menu');
  menu.classList.toggle('show');
}
const entryElements = $('.entry');
let entryIndex = 0;