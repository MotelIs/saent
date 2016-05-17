var ProgressBar = function() {

  $(document).ready(function(){


      var winHeight = $(window).height(),
        docHeight = $(document).height(),
        progressIndicator = $('.progress-bar'),
        max, value, percentage;

      /* Set the max scrollable area */
      max = docHeight - winHeight;
      progressIndicator.attr('max', max);

      $(document).on('scroll', function(){
         value = $(window).scrollTop();
         percentage = (value/max)*100;
         progressIndicator.css('width', percentage + '%');
      });

  })
};
