
function deleteData(e) {
  r = confirm('Delete?');
  if (r) {
    var todo = getSelected();
    chrome.storage.sync.remove(todo);
    // if (e) {
    //   var todo = getSelected();
    //   chrome.storage.sync.remove(todo);
    // }
    // else {
    //   chrome.storage.sync.clear();
    // }
  }
}

function importData() {
  var text = document.getElementById('import').value;
  input = JSON.parse(text);
  chrome.storage.sync.set(input);
}

function exportData(outputFormat) {
  var result = "";
  var todo = getSelected();
  chrome.storage.sync.get(todo, function(items) {
    if (outputFormat == 'mark') {
      for (var url in items) {
        result += `* [${items[url].title}](${url})<br>`;
      }
    }
    else if (outputFormat == 'json') {
      result = JSON.stringify(items);
    }
    document.getElementById('region').innerHTML = result;
  });
}

function loadClickable() {
  var result = "";
  chrome.storage.sync.get(function(items) {
    for (var url in items) {
      result += `<div class="item"><img src="${items[url].favicon}"><a href="${url}" target="_blank">${items[url].title}</a></div>`;
    }
    document.getElementById('clickable').innerHTML = result;
  });
}

function getSelected() {
  var ret = [];
  var matches = document.querySelectorAll('[selected]');
  if (matches[0]) {
    for (var i=0; i < matches.length; i++) {
      ret.push(matches[i].getElementsByTagName('a')[0].getAttribute('href'));
    }
    return ret;
  }
  else {
    return null;
  }
}

function select(elem) {
  if (elem.getAttribute('selected')) {
    elem.removeAttribute('style');
    elem.removeAttribute('selected');
  }
  else {
    elem.style.backgroundColor = "#EEE";
    elem.setAttribute('selected', true);
  }
}

function invertSelection() {
  var matches = document.getElementsByClassName('item');
  for (var i=0; i < matches.length; i++) {
    select(matches[i]);
  }
}



document.getElementById('invertSelection').addEventListener('click', invertSelection);
document.getElementById('delete').addEventListener('click', deleteData);
document.getElementById('exportMark').addEventListener('click', function(){exportData('mark');});
document.getElementById('exportJson').addEventListener('click', function(){exportData('json');});
document.getElementById('importJson').addEventListener('click', importData);
document.addEventListener('DOMContentLoaded', loadClickable);
document.getElementById('clickable').addEventListener('click', function() {
  if (event.target.tagName == 'A') {
    return 0;
  }
  else if (event.target.className == 'item') {
    select(event.target);
  }
  else if (event.target.tagName == 'IMG') {
    select(event.target.parentElement);
  }
});
document.addEventListener("keydown", function(event) {
  if(event.ctrlKey && event.keyCode == 65) {
    invertSelection();
    event.preventDefault();
  }
  else if (event.keyCode == 46) {
    deleteData(1);
  }
});


