$(document).ready(function() {
  var message = "Coming Soon..."

  for (var i=0, len=message.length; i<len; i++) {
    $("#text").append("<span style='animation-delay: -" +0.5*i + "s'>"+message[i]+"</span>");
  }

});
