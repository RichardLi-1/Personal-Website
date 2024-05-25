console.log("from script file");

const entryElements = $('.entry');
let entryIndex = 0;

$('.next').click(function(){
   entryIndex++;
   entryElements.hide();
   $(entryElements[entryIndex]).show();
});

$('.back').click(function(){
   entryIndex--;
   entryElements.hide();
   $(entryElements[entryIndex]).show();
});