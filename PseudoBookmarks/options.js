
function deleteData() {
  chrome.storage.sync.clear();
}

function exportData() {
  var result = "";
  chrome.storage.sync.get(function(items) {
    for (var url in items) {
      result += "* [" + items[url].title + "](" + url + ")<br>";
    }
  document.getElementById('region').innerHTML = result;
  });
}

function loadClickable() {
  var result = "";
  chrome.storage.sync.get(function(items) {
    for (var url in items) {
      result += "<img src=\"" + items[url].favicon + "\">" + "<a href=\"" + url + "\">" + items[url].title + "</a><br>";
    document.getElementById('clickable').innerHTML = result;
    }
  });
}

document.getElementById('export').addEventListener('click', exportData);
document.addEventListener('DOMContentLoaded', loadClickable);
document.getElementById('delete').addEventListener('click',deleteData);


