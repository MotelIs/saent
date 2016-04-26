var ScrollSection = function() {

  $(document).ready(function(){

      var current = '',
          top = '',
          sections = $('[data-section]'),
          ui = $('[data-ui]'),
          uiTitle = $('[data-ui-title]'),
          uiButton = $('[data-ui-button-text]'),
          uiFoldout = $('[data-ui-foldout-text]');

      var updateText = function() {
        if(current.length){
          ui.addClass('active');

          var newText = content[current];

          uiTitle.text(newText.title);
          uiButon.text(newText.button);
          uiFoldout.text(newText.foldout);

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

          // if section has scrolled passed
          if(section.top < top) {
            activeSection = section.name;

          // have not reached next section. return previous
          } else {
            return activeSection;
          }
        }
      };

      var runAnimation = function(newSection) {

        if(current != newSection) {
          current = newSection;
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
