'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{ txt: 'I never eat Falafel', size: 40, align: 'right', color: 'white' }]
}

var gImgs = [
    { id: 101, url: 'img/1.jpg', keywords: ['trump'] },
    { id: 102, url: 'img/2.jpg', keywords: ['animals'] },
];

function getMeme() {
    return gMeme;
}

