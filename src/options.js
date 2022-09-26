// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set({
    hideForum: document.getElementById('hideForum').checked,
    hideCategories: document.getElementById('hideCategories').checked,
    thumbnailSize: document.getElementById('thumbSizeSlider').value
  }, function() {
    // Update status to let user know options were saved.
    //var status = document.getElementById('status');
    //status.textContent = 'Options saved.';
    //setTimeout(function() {
    //  status.textContent = '';
    //}, 750);
  });
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    hideForum: false,
    hideCategories: false,
    thumbnailSize: 250
  }, function(items) {
    document.getElementById('hideForum').checked = items.hideForum;
    document.getElementById('hideCategories').checked = items.hideCategories;
    document.getElementById('thumbSizeSlider').value = items.thumbnailSize;
    document.getElementById('thumbSizeValue').innerHTML = items.thumbnailSize;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('hideForum').addEventListener('change', save_options);
document.getElementById('hideCategories').addEventListener('change', save_options);
document.getElementById('thumbSizeSlider').addEventListener('change', save_options);

// Update the current slider value (each time you drag the slider handle)
var slider = document.getElementById("thumbSizeSlider");
var output = document.getElementById('thumbSizeSlider');
slider.oninput = function() {
  output.innerHTML = this.value;
}