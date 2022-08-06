const checkTimeout = 100;

function CheckImages() {
 
    var rows = document.getElementsByClassName("torrent");
 
    if(rows.length == 0) {
       setTimeout(CheckImages, checkTimeout);
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

                    targetImg.width = 250;
                    targetImg.src = sourceImg;
                }
            }
        );
    }
 }
 
 setTimeout(CheckImages, checkTimeout);

 