var ScrollSection = function() {

  $(document).ready(function(){

      var body = $('html, body'),
          current = '',
          top = '',
          sections = $('[data-section]'),
          nextSection = '',
          ui = $('[data-ui]'),
          uiTitle = $('[data-ui-title]'),
          uiButton = $('[data-ui-button-text]'),
          uiFoldout = $('[data-ui-foldout-text]'),
          animation = $('[data-animation]'),
          progressHint = $('.progress-hint')

      var updateText = function() {
        if(current.length){
          ui.addClass('active');

          if(content[current]) {
            var newText = content[current];
            uiTitle.text(newText.title);
            uiButton.html(newText.button);
            uiFoldout.text(newText.foldout);
          }

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
        var activeSectionIndex = -1

        for(var i = 0; i < sections.length; i++) {
          var section = sections[i];
          var sectionObj = $(section.self);

          // if section has scrolled passed
          if(section.top < top) {
            activeSection = sectionObj
            activeSectionName = section.name;
            activeSectionIndex = section.index;


            if(!activeSection.hasClass('active')) {
              activeSection.addClass('active');
              animation.attr('data-animation', section.name)
            }

          // have not reached next section. return previous
          } else {
            sectionObj.removeClass('active');
            animation.attr('data-animation', activeSectionName)

            // initialize categorizing animation
            if(activeSectionName === 'categorizing') {
              categorizingDemo();
            }

            return { name: activeSectionName, index: activeSectionIndex };
          }
        }
        // return last section
        return sections[sections.length - 1].name;
      };

      var runAnimation = function(newSection) {

        name = newSection.name;
        index = newSection.index;

        if(typeof name !== "undefined" && current != name.className) {
          current = name;
          updateText();

          if(sections[index + 1]) {
            nextSection = index + 1;
          }
        } else {
          // do nothing, still in the same section
        }
      };

      var scrollToNext = function() {
        body.animate({
          scrollTop: sections[nextSection].top,
        }, 500);
      }


      // turn sections into objects
      for(var i = 0; i < sections.length; i++) {
        sections[i] = new section(sections[i], i);
      }

      // initialize
      $(document).ready(function(){
        runAnimation(getCurrentSection());
      });


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

      // watch for clicking
      progressHint.click(function(){
        scrollToNext();
      });

  })

  //---
  // Animation for inactive alert

  var categorizingDemo = function() {

    var stopAnimation = false,
        inactiveAlert = $('[data-category-alert]:not(.active)')

    if(inactiveAlert.length) {
      inactiveAlert.removeClass('active');
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
    }


  };
};



// section object
function section(elem, i) {
  this.self = elem;
  this.top = $(elem).offset().top;
  this.name = elem.className;
  this.index = i;

  this.updateTop = function() {
    this.top = $(this.self).offset().top;
  }
}
