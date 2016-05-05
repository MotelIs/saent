var Categorizing = function() {

  var categoryBtn = $("[data-button]"),
      stopAnimation = false,
      inactiveAlert = $('[data-category-alert]:not(.active)')


  categoryBtn.click(function(){

    stopAnimation = true;

    var newCategory = $(this).attr('data-category')
    var app = $(this).attr('data-button')

    var alert = $('[data-category-app=' + app + ']')
    alert.attr('data-category-alert', newCategory)

    // make sure it's set to active
    var existingClass = alert.attr('class')
    if(existingClass.indexOf('active') < 0) {
      alert.attr('class', existingClass + ' active')
    }
  });


  //---
  // Animation for inactive alert

  var categorizingDemo = function() {

    // make sure it's set to active
    var existingClass = inactiveAlert.attr('class')
    if(existingClass.indexOf('active') < 0) {
      inactiveAlert.attr('class', existingClass + ' active')
    }

    window.setTimeout(function(){
      if(!stopAnimation) {
        inactiveAlert.attr('data-category-alert', 'good');
      }
    }, 1000);
    window.setTimeout(function(){
      if(!stopAnimation) {
        inactiveAlert.attr('data-category-alert', 'neutral');
      }
    }, 2500);
    window.setTimeout(function(){
      if(!stopAnimation) {
        inactiveAlert.attr('data-category-alert', 'evil');
      }
    }, 4000);
    window.setTimeout(function(){
      if(!stopAnimation) {
        inactiveAlert.attr('data-category-alert', 'good');
      }
    }, 5500);


  };


  //---
  // initialize animation

  if(inactiveAlert.length) {
    categorizingDemo();
  }
};
