'use strict'
var gCanvas;
var gCtx;
var gCurrTxtLine;


function onInit() {
    gCanvas = document.getElementById('my-canvas')

    gCtx = gCanvas.getContext('2d');

    renderGallery();

    //listen for text input:
    var input = document.querySelector('[name="meme-line"]');
    input.addEventListener('input', textEditFromInput);

}

function renderGallery() {
    var sqrImgsForRender = getGalleryImgs();
    document.querySelector('.img-container').innerHTML = sqrImgsForRender;
}

function onOpenGallery() {
    openGallery();
}

function onOpenEditor(num) {
    openEditor();
    var currMeme = getMeme();
    currMeme.selectedImgId = +num;
    console.log(num);
    drawImg(num);
}

function onToggleSavedMemesMenu() {
    toggleMemesModal();
}

function onToggleAboutModal() {
    toggleAboutModal();
}


function drawImg(id) {
    var elImgContainer = document.querySelector('.canvas-img-container');
    elImgContainer.innerHTML = `<img class = "canvas-img" src="./images/meme-imgs (square)/${id}.jpg" alt = "img-${id}" style = "display: none;">`;
    var elImg = document.querySelector('.canvas-img');
    // Naive approach:
    // there is a risk that image is not loaded yet and nothing will be drawn on canvas
    console.log(gCanvas.width, gCanvas.height);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawText() {
    //TO DO: needs map to render all object texts- done
    //TO DO: add default line placing
    var currMeme = getMeme();
    // var currline = currMeme.selectedLineIdx;


    currMeme.lines.forEach(function (currline, idx) {
        // var txt = currMeme.lines[currline].txt;
        // var txtFontSize = currMeme.lines[currline].size
        // var txtAlign = currMeme.lines[currline].align;
        // var txtColor = currMeme.lines[currline].color
        // var txtLineY = currMeme.lines[currline].lineY;

        var txt = currline.txt;
        var txtFontSize = currline.size;
        var txtAlign = currline.align;
        var txtColor = currline.color;
        var txtLineY = currline.lineY;
        var txtFont = currline.font;
        var currLineIdx = currMeme.selectedLineIdx;

        //FONT
        gCtx.font = `${txtFontSize}px ${txtFont}`;

        //TEXT COLORS
        gCtx.strokeStyle = `${txtColor}`;

        if (currline.stroke) {
            gCtx.fillStyle = `${txtColor}`;
        } else {
            gCtx.fillStyle = 'white';
        }


        //TEXT ALIGN
        switch (txtAlign) {
            case 'center':
                gCtx.textAlign = 'center';
                if (currline.firstEdit) {
                    gCtx.fillText(txt, gCanvas.width / 2, gCanvas.height / 8)
                    gCtx.strokeText(txt, gCanvas.width / 2, gCanvas.height / 8)
                    currline.lineY = getLineInitialY(currLineIdx);
                    currline.lineX = gCanvas.width / 2;
                    currline.firstEdit = false;
                }
                else {
                    gCtx.fillText(txt, currline.lineX, txtLineY)
                    gCtx.strokeText(txt, currline.lineX, txtLineY)
                }
                break;
            case 'left':
                gCtx.textAlign = 'left';// to the right of x
                if (currline.firstEdit) {
                    gCtx.fillText(txt, 10, gCanvas.height / 8)
                    gCtx.strokeText(txt, 10, gCanvas.height / 8)
                    currline.lineY = getLineInitialY(currLineIdx);
                    currline.lineX = 10;
                    currline.firstEdit = false;
                } else {
                    gCtx.fillText(txt, currline.lineX, txtLineY)
                    gCtx.strokeText(txt, currline.lineX, txtLineY)
                }
                break;
            case 'right':
                gCtx.textAlign = 'right';//to the left of x
                if (currline.firstEdit) {
                    gCtx.fillText(txt, gCanvas.width - 10, gCanvas.height / 8)
                    gCtx.strokeText(txt, gCanvas.width - 10, gCanvas.height / 8)
                    currline.lineY = getLineInitialY(currLineIdx);
                    currline.lineX = gCanvas.width - 10;
                    currline.firstEdit = false;
                } else {
                    gCtx.fillText(txt, currline.lineX, txtLineY)
                    gCtx.strokeText(txt, currline.lineX, txtLineY)
                }
                break;
        }
        if (currMeme.selectedLineIdx === idx) {
            drawRect(gCtx.measureText(txt).width);
        }
    })

}


function textEditFromInput(e) {//change gMeme line text according to input
    var currMeme = getMeme();
    var currline = currMeme.selectedLineIdx;
    var memeId = +currMeme.selectedImgId;
    //update model:
    currMeme.lines[currline].txt = e.target.value;

    drawImg(memeId);
    drawText();
}

function onSelectFont() {
    var chosenFont = document.getElementById("font").value;
    var currMeme = getMeme();
    var currline = currMeme.selectedLineIdx;
    var memeId = +currMeme.selectedImgId;
    //update model:
    currMeme.lines[currline].font = chosenFont;
    drawImg(memeId);
    drawText();
}

function onSelectFontColor() {
    var chosenFontColor = document.getElementById("color").value;
    var currMeme = getMeme();
    var currline = currMeme.selectedLineIdx;
    var memeId = +currMeme.selectedImgId;
    //update model:
    currMeme.lines[currline].color = chosenFontColor;
    drawImg(memeId);
    drawText();
}


//event listener for input and adding current text as placeholder

function onChangeFontSize(num) {
    var currMeme = getMeme();
    var currline = currMeme.selectedLineIdx;
    currMeme.lines[currline].size += num;
    var memeId = +currMeme.selectedImgId;
    drawImg(memeId);
    drawText();
}

function onChangeLineHeight(num) {
    var currMeme = getMeme();
    var currline = currMeme.selectedLineIdx;
    currMeme.lines[currline].lineY += num;
    var memeId = +currMeme.selectedImgId;

    drawImg(memeId);
    drawText();
}

function onAddLine() {
    var currMeme = getMeme();
    //add new line to object(model):
    var newLine = { txt: 'I never eat Falafel', size: 40, align: 'center', color: 'black', lineY: 0, lineX: 0, font: 'Impact', firstEdit: true, stroke: false };
    currMeme.lines.push(newLine);
    //change line index to new line:
    currMeme.selectedLineIdx++;
}

function onSwitchLines() {
    var currMeme = getMeme();
    var memeId = +currMeme.selectedImgId;
    currMeme.selectedLineIdx++;
    if (currMeme.selectedLineIdx >= currMeme.lines.length) {
        currMeme.selectedLineIdx = 0;
    }
    ///TO DO: focus- done. requires rendering:
    drawImg(memeId);
    drawText();
    ///TO DO: insert current line text as placeholder

}

function onChangeTxtAlign(chosenAlign) {
    var currMeme = getMeme();
    var memeId = +currMeme.selectedImgId;
    var currLine = currMeme.selectedLineIdx;
    currMeme.lines[currLine].align = chosenAlign;
    //render DOM:
    drawImg(memeId);
    drawText();

}

function onDeleteLine() {
    var currMeme = getMeme();
    var memeId = +currMeme.selectedImgId;
    var currLine = currMeme.selectedLineIdx;
    currMeme.lines.splice(currLine, 1);
    drawImg(memeId);
    drawText();
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function toggleStroke() {
    var currMeme = getMeme();
    var memeId = +currMeme.selectedImgId;
    var currLine = currMeme.selectedLineIdx;
    if (currMeme.lines[currLine].stroke) {
        currMeme.lines[currLine].stroke = false;
    } else {
        currMeme.lines[currLine].stroke = true;
    }
    drawImg(memeId);
    drawText();
}



