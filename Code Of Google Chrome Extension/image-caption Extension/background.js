
/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Get Image Description",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick": onClickHandler
});

function onClickHandler(info, tab) { 
  var img = info.srcUrl;
  console.log(img);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": img});
  });
};
