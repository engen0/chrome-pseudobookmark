

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.storage.sync.get(function(items) {
    if (tab.url in items) {
      chrome.pageAction.hide(tab.id);
    }
    else {
      chrome.pageAction.show(tab.id);
    }
  });
});


chrome.pageAction.onClicked.addListener(addPage);

function addPage(tab) {
  var obj = {};
  obj[tab.url] = {'favicon':tab.favIconUrl,'title':tab.title};
  chrome.storage.sync.set(obj);
  chrome.pageAction.hide(tab.id);
}


chrome.commands.onCommand.addListener(function(cmd) {
  if (cmd=='add-page') {
    chrome.tabs.query({active:true,currentWindow:true},function(tabs) {
      addPage(tabs[0]);
    });
  }
  else {
    chrome.tabs.create({"url":"options.html"});
  }
});