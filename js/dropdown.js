var Dropdown = function() {

  var dropdownButton = $('[data-ui-button]');
  var foldout = $('[data-ui-foldout]');

  dropdownButton.click(function(){
    dropdownButton.toggleClass('active');
    foldout.toggleClass('active');
  })
};
