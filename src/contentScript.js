const checkImagesTimeout = 100;
const checkSettingsTimeout = 500;
let thumbnailSize = 250;

function CheckImages() {
 
    var rows = document.getElementsByClassName("torrent");
 
    if(rows.length == 0) {
       setTimeout(CheckImages, checkImagesTimeout);
    }
    else {
        Array.from(document.getElementsByClassName("torrent")).forEach(
            function(element, index, array) {
                const targetImgs = element.getElementsByTagName("img");
                if(targetImgs)
                {
                    const targetImg = element.getElementsByTagName("img")[0];
                    const script = element.getElementsByTagName("script")[0].outerText;
                    const sourceImgStart = script.indexOf("src=") + 6;
                    const sourceImgEnd = script.indexOf("\"", sourceImgStart) - 1;
                    const sourceImg = script.substring(sourceImgStart, sourceImgEnd).replace(/\\/g, '');;
                    console.log(sourceImg);

                    targetImg.width = thumbnailSize;
                    targetImg.src = sourceImg;
                }
            }
        );
    }
 }

 function CheckSettings() {
    chrome.storage.sync.get({
        hideForum: false,
        hideCategories: false,
        thumbnailSize: 250
      }, function(items) {
        if(items.hideForum) {
            document.getElementsByClassName("latest_threads")[0].style.display = "none";
            document.getElementsByClassName("latest_threads")[1].style.display = "none";
        } else {
            document.getElementsByClassName("latest_threads")[0].style.display = "block";
            document.getElementsByClassName("latest_threads")[1].style.display = "block";
        }

        if(items.hideCategories) { 
            document.getElementById("cat_list").style.display = "none";
        } else {
            document.getElementById("cat_list").style.display = "block";
        }

        if(items.thumbnailSize !== thumbnailSize) {
          thumbnailSize = items.thumbnailSize;
          CheckImages();
        }
      });
 }

CheckSettings();
setTimeout(CheckImages, checkImagesTimeout);
setInterval(CheckSettings, checkSettingsTimeout);

 