chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message) {
      console.log(request.message);
      var returnFocusElement = $('img[src="' + request.message + '"]')[0];
      makeOverlay(returnFocusElement);
      $.ajax({
        //url: "https://v0fkjw6l82.execute-api.us-west-2.amazonaws.com/prod/auto-alt-text-api?url=" + request.message,
        url: "https://image-caption-generator.herokuapp.com/?imgsrc=" + request.message,
        success: function(data) {
          data = data.replace(/\'/g, '\"')
          data = JSON.parse(data);
          var caption = data.captions[0];
          if(caption.prob != -1) {
            description = data.captions[0].sentence;
            addOverlayText(description.charAt(0).toUpperCase() + description.slice(1));
          } else {
            addOverlayText('There was an error processing your image.')
          }
        },
        error: function() {
          addOverlayText('There was an error contacting the servers to process your image')
        }
      });
    }
  }
);
var isDisplaying = false;
var overlayText = "Loading..";
var exitText = "Press the escape key to remove this overlay.";
var returnFocusToElement;
function makeOverlay(el) {
  isDisplaying = true;
  returnFocusToElement = el;
  $('body').append('<div id="aat-overlay"><div id="aat-text" tabindex="1">'+ overlayText + '.<br><br>' + exitText + '</div></div>');
}

function addOverlayText(text) {
  if (isDisplaying) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text + exitText))
    $('#aat-text').html(text + '<br><br>' + exitText);
    $('#aat-text').focus();
  }
}

$('body').on('keydown', function(e) {
  if (e.keyCode === 27 && isDisplaying) {
    $('#aat-text').remove();
    $('#aat-overlay').remove();
    isDisplaying = false;
    returnFocusToElement.focus();
    returnFocusToElement = null;
  }
});
