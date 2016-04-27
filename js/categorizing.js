var Categorizing = function() {

  var categoryBtn = $("[data-button]")


  categoryBtn.click(function(){

    var newCategory = $(this).attr('data-category')
    var app = $(this).attr('data-button')

    var alert = $('[data-category-app=' + app + ']')
    alert.attr('data-category-alert', newCategory)

    // make sure it's set to active
    var existingClass = alert.attr('class')
    if(existingClass.indexOf('active') < 0) {
      alert.attr('class', existingClass + ' active')
    }
  })
};
