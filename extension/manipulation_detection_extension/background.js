
/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Highlight Likely Manipulation",
  "id": 'authenticview',
  "type" : "normal",
  "contexts" : ["image"],
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "authenticview") {
      process(info, tab);
  }
});

function process(info, tab) { 
  var img = info.srcUrl;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": img});
  });
};
