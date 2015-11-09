# chrome-pseudobookmark
This Chrome extension will create an additional Add Bookmark button with its own separate storage location.  

Ctrl+Shift+A bookmarks the active page.  
Ctrl+Shift+E opens the options page.  

Press the toolbar button to bookmark the page.  
The button disappears on bookmarked pages.

## Options Page

* Ctrl+A inverts item selection.
* The options page presents bookmarked URLs as hyperlinks.
* Click/click-twice to select/deselect items.
* Pressing the del key, triggers the delete function of selected items.
  * **One** confirmation dialog will appear before permanent deletion. 
* There's an import/export function. It works with item selection. Import works with JSON. Export works with JSON/markdown.
  * **JSON Format:** `{url : {'favicon': faviconurl, 'title': title}}`
* There's a delete button.  
* There's an invert selection button.

## Notes

* I don't think extensions like this should be used for maintaining browsing data. Only for producing quick lists.
* It doesn't have folders.
* I might write a python component that duplicates the extension by changing its name and color scheme, to provide multiple toolbar buttons and a folder type functionality. That's only if the Chrome API doesn't support multiple activepage buttons.

