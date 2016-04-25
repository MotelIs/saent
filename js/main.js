$(document).ready(function(){
  var winHeight = $(window).height(),
      docHeight = $(document).height(),
      progressIndicator = $('.progress-bar'),
      max, value, percentage;

  /* Set the max scrollable area */
  max = docHeight - winHeight;
  progressIndicator.attr('max', max);

  console.log(max);

  $(document).on('scroll', function(){
     value = $(window).scrollTop();
     percentage = (value/max)*100;
     progressIndicator.css('background', 'linear-gradient(to right,#14AAE2,#14AAE2 ' + percentage + '%,#F4F4F4 ' + percentage + '%,#F4F4F4)');
  });
});
