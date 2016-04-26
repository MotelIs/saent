var Dropdown = function() {

  var dropdownButton = $('[data-ui-button]')

  dropdownButton.click(function() {
    var elem = $(this).attr('data-ui-button')
    var foldout = $('[data-ui-foldout="' + elem + '"]')

    $(this).toggleClass('active')
    foldout.toggleClass('active')
  })
};
