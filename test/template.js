function getImagesHtml(i) {
    return /*html*/`
     <div onclick="openImageInDetail(${i})"class="single_picture">
        <img src="${myImgs[i]}">
    </div> 
    `
}

function singleImageHtml(i) {
    return /*html*/`
    <div class="big_picture">
     <img class="image" src="${myImgs[i]}">
    </div>
    <div>
        <button onclick="nextImage(${i}, event)">Weiter</button>
    </div>`
}
