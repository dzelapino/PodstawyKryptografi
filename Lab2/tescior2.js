const fs = require('fs');

let crypto;
let keyToFind = '';

try {
  crypto = fs.readFileSync('./crypto.txt').toString();
} catch (error) {
}

function codeBreaker(textBin) {
  let i = 0
  let spaceFound = false
  let foundKey;
  while (i < textBin.length) {
    let localChar = textBin[i]
    if(localChar.charCodeAt().toString(2).length == 7 && localChar.charCodeAt().toString(2)[0] == 1 && localChar.charCodeAt().toString(2)[1] == 0) {
      spaceFound = true;
      foundKey = (localChar.charCodeAt() ^ 32)
      keyToFind = keyToFind + String.fromCharCode(foundKey)
      break
    }
    i = i + 1
  }

  // decoding bin
  let j = 0
  if (spaceFound == true) {
    while (j < textBin.length) {
      textBin[j] = String.fromCharCode((textBin[j].charCodeAt() ^ foundKey))
      j = j + 1
    }
  }
  else {
    while (j < textBin.length) {
      textBin[j] = '?'
      j = j + 1
    }
  }

  return textBin
}

function codeBinder(someText) {
  let binI = 0
  let codeBins = []
  while (binI < 64) {
    codeBins.push([])
    binI = binI + 1
  }
  let i = 0
  let columnIterator = 0

  while (i < someText.length) {
    if (columnIterator == 64) {
      columnIterator = 0
    }
    else {
      
      codeBins[columnIterator].push(someText[i])

      columnIterator = columnIterator + 1
      i = i + 1
    }
  }
  console.log(codeBins.length)
  let lenTest = 0
  let finalTextBins = [];
  while (lenTest < codeBins.length) {
    // console.log(codeBins[lenTest].length)
    finalTextBins.push(
      codeBreaker(codeBins[lenTest])
    )
    lenTest = lenTest + 1
  }
  console.log(finalTextBins.length)
  console.log(someText.length)
  console.log(finalTextBins.flat().length)
  let finalText = ''
  let finalI = 0
  let finalTextPointer = 0
  let finalColumnIterator= 0
  while (finalI < finalTextBins.flat().length) {
    if (finalColumnIterator == 64) {
      finalColumnIterator = 0
      finalTextPointer = finalTextPointer + 1
    }
    else {
      
      finalText = finalText + finalTextBins[finalColumnIterator][finalTextPointer]

      finalColumnIterator = finalColumnIterator + 1
      finalI = finalI + 1
    }
  }
  console.log(finalText)
  fs.writeFile('finalTest.txt', finalText, (err) => {
    if (err) throw err;
});
}

codeBinder(crypto)

console.log(keyToFind)