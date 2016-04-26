var ScrollSection = function() {

  $(document).ready(function(){

      var current = '';
      var top = $(window).scrollTop();
      var sections = $('[data-section]');
      var ui = $('[data-ui]');

      var updateText = function() {
        if(current.length){
          ui.addClass('active');
          var newText = content[current];
          $('[data-ui-title]').text(newText.title);
          $('[data-ui-button-text]').text(newText.button);
          $('[data-ui-foldout-text]').text(newText.foldout);

        } else {
          // in the first section
          ui.removeClass('active');
        }
      };

      var getCurrentSection = function() {

        // measure off the bottom of fixed header
        top = $(window).scrollTop() + (128);
        var activeSection = ''

        for(var i = 0; i < sections.length; i++) {
          var section = sections[i];

          // if section has scrolled passed middle of screen
          if(section.top < top) {
            activeSection = section.name;

          // have not reached next section. return previous
          } else {
            return activeSection;
          }
        }
      };

      var runAnimation = function(section) {

        if(current != section) {
          current = section;
          updateText();
        } else {
          // do nothing, still in the same section
        }
      };


      // turn sections into objects
      for(var i = 0; i < sections.length; i++) {
        sections[i] = new section(sections[i]);
      }


      // watch for scrolling
      $(document).on('scroll', function(){
         runAnimation(getCurrentSection());
      });

      // watch for resizing
      $(window).resize(function(){
        for(var i = 0; i < sections.length; i++) {
          sections[i].updateTop();
        }
      });

  })
};



// section object
function section(elem) {
  this.self = elem;
  this.top = $(elem).offset().top;
  this.name = elem.className;

  this.updateTop = function() {
    this.top = $(this.self).offset().top;
  }
}
