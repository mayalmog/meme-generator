'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };



var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

// lines: [{ txt: '', size: 40, align: 'center', color: 'black', lineY: 0, lineX: 0, font: 'Impact', firstEdit: true, stroke: false }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animals', 'dogs'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animals', 'baby', 'sleep'] },
    { id: 4, url: 'img/4.jpg', keywords: ['animals', 'keyboard', 'sleep', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'win', 'success'] },
    { id: 6, url: 'img/6.jpg', keywords: ['aliens', 'funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'funny', 'surprised'] },
    { id: 8, url: 'img/8.jpg', keywords: ['willy wonka', 'tell me'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'evil', 'sniggle'] },
    { id: 10, url: 'img/10.jpg', keywords: ['obama', 'laughing', 'man'] },
    { id: 11, url: 'img/11.jpg', keywords: ['fighters', 'kissing', 'sports'] },
    { id: 12, url: 'img/12.jpg', keywords: ['צדיק', 'reliable', 'pointing'] },
    { id: 13, url: 'img/13.jpg', keywords: ['cheers', 'gatsby'] },
    { id: 14, url: 'img/14.jpg', keywords: ['what if', 'matrix'] },
    { id: 15, url: 'img/15.jpg', keywords: ['boromir', 'lord'] },
    { id: 16, url: 'img/16.jpg', keywords: ['star trek', 'frustrated', 'picard'] },
    { id: 17, url: 'img/17.jpg', keywords: ['putin', 'frightening', 'victory', 'politics'] },
    { id: 18, url: 'img/18.jpg', keywords: ['everywhere', 'toy story', 'buzz'] },

];

function getMeme() {
    return gMeme;
}

function openEditor() {
    //for hiding an element, it is required to remove any "display" attribute, also grid
    document.querySelector('.gallery-container').classList.add("hide");
    document.querySelector('.gallery-container').classList.remove("grid");
    document.querySelector('.editor-container').classList.add("grid");
    document.querySelector('.editor-container').classList.remove("hide");
    document.querySelector('body').classList.remove("show-gallery");

}

function openGallery() {
    document.querySelector('.gallery-container').classList.remove("hide");
    document.querySelector('.editor-container').classList.remove("grid");
    document.querySelector('.editor-container').classList.remove("grid");
    document.querySelector('.editor-container').classList.add("hide");
    document.querySelector('body').classList.add("show-gallery");
}

function toggleMemesModal() {
    document.querySelector('body').classList.toggle("open-memes");
}

function toggleAboutModal() {
    document.querySelector('body').classList.toggle("open-about");
}

// function drawPoint(x, y) {
//     gCtx.beginPath();
//     gCtx.arc(x, y, 10, 0, 2 * Math.PI);
//     gCtx.fillStyle = 'green';
//     gCtx.fill();
//     gCtx.stroke();
// }

function drawRect(width) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    var height = -currLine.size - 10;
    var currLineAlign = currLine.align;
    var widthForRect = width + 20;

    switch (currLineAlign) {
        case 'center':
            var x = currLine.lineX - 0.5 * width - 10;
            var y = currLine.lineY + 10;
            break;
        case 'left':
            var x = currLine.lineX - 10;
            var y = currLine.lineY + 10;
            break;
        case 'right':
            var x = currLine.lineX - width - 10;
            var y = currLine.lineY + 10;
            break;

    }
    gCtx.beginPath();
    gCtx.rect(x, y, widthForRect, height);
    gCtx.strokeStyle = 'white';
    gCtx.lineWidth = 2;
    gCtx.stroke();
}

function getLineInitialY(lineIdx) {
    if (lineIdx === 0) {
        return gCanvas.height / 8;
    } else if (lineIdx === 1) {
        return gCanvas.height - gCanvas.height / 8;
    } else {
        return gCanvas.height / 2;
    }
}

function getGalleryImgs() {
    var strHTML = ``;
    gImgs.forEach(img =>
        strHTML += `<img src="./images/meme-imgs (square)/${img.id}.jpg" onclick="onOpenEditor(${img.id})"></img>`
    )
    return strHTML
}

function isLineClicked(clickedPos) {
    var isClickInLine = false;
    gMeme.lines.forEach((currLine, idx) => {
        var linePosX = currLine.lineX;
        var linePosY = currLine.lineY;
        // console.log(linePosX, linePosY);
        var currLineMetrics = gCtx.measureText(currLine.txt);

        var currLineWidth = currLineMetrics.width;
        var currLineHeight = currLineMetrics.actualBoundingBoxAscent +
            currLineMetrics.actualBoundingBoxDescent;
        // console.log('width: ', currLineWidth, 'height', currLineHeight);
        var isXClickInLine = ((linePosX - (currLineWidth / 2)) <= clickedPos.x) &&
            (clickedPos.x <= (linePosX + (currLineWidth / 2)));
        var isYClickInLine = ((linePosY - (currLineHeight / 2)) <= clickedPos.y) &&
            (clickedPos.y <= (linePosY + currLineHeight));
        if (isXClickInLine && isYClickInLine) {
            gMeme.selectedLineIdx = idx;
            isClickInLine = isXClickInLine && isYClickInLine;
        }
    })
    // console. log('isClickInLineFunc: ' + isClickInLine);
    return isClickInLine;

}


function setLineDrag(isDrag) {

    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    if (!currLine) return;

    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag;
    gMeme.lines[gMeme.selectedLineIdx].align = '';


}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];

}


function moveLine(dx, dy) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.lineX += dx
    currLine.lineY += dy
}

