function alignBlocks() {
  var max_height = 0;
  $('.middle-side .align-content').each(function(){
    if ($(this).height() > max_height) {
      max_height = $(this).height()
    }
  })
  .height(max_height);
}
$(function(){
  
  //Cufon.replace('#company-logo h1', { fontFamily: 'Myriad Pro Bold' });
  Cufon.replace('#company-logo h2', {
    fontFamily: 'Myriad Pro Regular'
  });
  Cufon.replace('#main-navigation a', {
    hover: true,
    fontFamily: 'Myriad Pro Regular'
  });
  Cufon.replace('#header-banner h2, .big-button', {
    fontFamily: 'Times New Roman'
  });
  Cufon.replace('.info-box h3, .info-box h4', {
    fontFamily: 'Times New Roman'
  });
  $('.middle-side .info-box:first-child').addClass('no-delimeter')
  var agent = navigator.userAgent.toLowerCase();
  if((agent.indexOf('msie 6.0') == -1) && (agent.indexOf('msie 7.0') == -1)) {    
    $(window).load(function(){alignBlocks()})
  } else {
    var r = setTimeout('alignBlocks()', 3000)
  }
})

