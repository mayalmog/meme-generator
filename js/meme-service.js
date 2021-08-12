'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{ txt: 'I never eat Falafel', size: 40, align: 'center', color: 'black', lineY: 0, lineX: 0, font: 'Impact', firstEdit: true, stroke: false }]
}

var gImgs = [
    { id: 101, url: 'img/1.jpg', keywords: ['trump'] },
    { id: 102, url: 'img/2.jpg', keywords: ['animals'] },
];

function getMeme() {
    return gMeme;
}

function toggleDisplay() {
    document.querySelector('.gallery-container').classList.toggle("hide");
    document.querySelector('.gallery-container').classList.toggle("grid");
    document.querySelector('.editor-container').classList.toggle("hide");
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

