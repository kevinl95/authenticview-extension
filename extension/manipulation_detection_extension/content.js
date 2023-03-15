chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message) {
      var returnFocusElement = $('img[src="' + request.message + '"]')[0];
      makeOverlay(returnFocusElement);
      $.ajax({
        type: "POST",
        url: "https://authenticview.beauty/analyze-url?url=" + request.message,
        success: function(data) {
          addOverlay("<img src='data:image/jpeg;base64," + data + "'/>'");
        },
        error: function() {
          addOverlay('<p>There was an error contacting the servers to process your image</p>')
        }
      });
    }
  }
);
var isDisplaying = false;
var overlayText = "<p>Loading</p>";
var exitText = "<p>Press the escape key to exit</p>";
var returnFocusToElement;
function makeOverlay(el) {
  isDisplaying = true;
  returnFocusToElement = el;
  $('body').append('<div id="aat-overlay"><div id="aat-img" tabindex="1">'+ overlayText + '<br><br>' + exitText + '</div></div>');
}

function addOverlay(text) {
  if (isDisplaying) {
    $('#aat-img').html(text + '<br><br>' + exitText);
    $('#aat-img').focus();
  }
}

$('body').on('keydown', function(e) {
  if (e.keyCode === 27 && isDisplaying) {
    $('#aat-img').remove();
    $('#aat-overlay').remove();
    isDisplaying = false;
    returnFocusToElement.focus();
    returnFocusToElement = null;
  }
});
