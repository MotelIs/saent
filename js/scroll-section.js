var ScrollSection = function() {

  $(document).ready(function(){

      var current = '',
          top = '',
          sections = $('[data-section]'),
          ui = $('[data-ui]'),
          uiTitle = $('[data-ui-title]'),
          uiButton = $('[data-ui-button-text]'),
          uiFoldout = $('[data-ui-foldout-text]'),
          animation = $('[data-animation]')

      var updateText = function() {
        if(current.length){
          ui.addClass('active');

          var newText = content[current];

          uiTitle.text(newText.title);
          uiButton.text(newText.button);
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
        var activeSectionName = ''

        for(var i = 0; i < sections.length; i++) {
          var section = sections[i];
          var sectionObj = $(section.self);

          // if section has scrolled passed
          if(section.top < top) {
            activeSection = sectionObj
            activeSectionName = section.name;


            if(!activeSection.hasClass('active')) {
              activeSection.addClass('active');
              animation.attr('data-animation', section.name)
            }

          // have not reached next section. return previous
          } else {
            sectionObj.removeClass('active');
            animation.attr('data-animation', activeSectionName)
            return activeSectionName;
          }
        }
        // return last section
        return sections[sections.length - 1].name;
      };

      var runAnimation = function(newSection) {
        if(current != newSection.className) {
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
