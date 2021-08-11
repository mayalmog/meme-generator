'use strict'
var gCanvas;
var gCtx;


function onInit() {
    gCanvas = document.getElementById('my-canvas')
    console.log(gCanvas);
    gCtx = gCanvas.getContext('2d');

    // drawImg();
    // drawText();

    //listen for text input:
    var input = document.querySelector('[name="meme-line"]');
    input.addEventListener('input', textEditFromInput);

}

function onOpenEditor(num) {
    document.querySelector('.gallery-container').classList.add("hide");
    document.querySelector('.gallery-container').classList.remove("grid");
    document.querySelector('.editor-container').classList.remove("hide");
    var currMeme = getMeme();
    currMeme.selectedImgId = +num;
    console.log(currMeme.selectedImgId);
    drawImg(num);

}


function drawImg(id) {
    // var currMeme = getMeme();
    // var currImgId = currMeme.selectedImgId;
    // console.log('drawImg', currImgId);

    var elImgContainer = document.querySelector('.canvas-img-container');
    elImgContainer.innerHTML = `<img class = "canvas-img" src="./images/meme-imgs (square)/${id}.jpg" alt = "img-${id}" style = "display: none;">`;
    var elImg = document.querySelector('.canvas-img');
    console.log(elImg);
    // Naive approach:
    // there is a risk that image is not loaded yet and nothing will be drawn on canvas

    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText() {
    var currMeme = getMeme();

    var txt = currMeme.lines[0].txt;//map
    var txtFontSize = currMeme.lines[0].size
    var txtAlign = currMeme.lines[0].align;
    var txtColor = currMeme.lines[0].color
    //FONT
    gCtx.font = `${txtFontSize}px Impact`;
    // console.log(gCtx.font)

    //TEXT COLORS
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = `${txtColor}`;

    //TEXT ALIGN
    switch (txtAlign) {
        case 'center':
            gCtx.textAlign = "center";
            gCtx.fillText(txt, gCanvas.width / 2, gCanvas.height - gCanvas.height / 8)
            gCtx.strokeText(txt, gCanvas.width / 2, gCanvas.height - gCanvas.height / 8)
            break;
        case 'left':
            gCtx.textAlign = "left";// to the right of x
            gCtx.fillText(txt, 10, gCanvas.height - gCanvas.height / 8)
            gCtx.strokeText(txt, 10, gCanvas.height - gCanvas.height / 8)
            break;
        case 'right':
            gCtx.textAlign = "right";//to the left of x
            gCtx.fillText(txt, gCanvas.width - 10, gCanvas.height - gCanvas.height / 8)
            gCtx.strokeText(txt, gCanvas.width - 10, gCanvas.height - gCanvas.height / 8)
            break;

    }

}


function textEditFromInput(e) {//change gMeme line text according to input
    var currMeme = getMeme();
    var memeId = +currMeme.id;
    console.log(memeId);
    currMeme.lines[0].txt = e.target.value;;//map
    // var inputTxt = document.querySelector('[name="meme-line"]').value;

    console.log(currMeme.lines[0].txt)
    drawImg(memeId);
    drawText();
}

//event listener for input and adding current text as placeholder


