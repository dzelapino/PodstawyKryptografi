// Made by Krzysztof Kołodziejski

const taskType = process.argv[2];
const fs = require('fs');

// FILES

let orig;
let plain;
let key;
let crypto;

try {
    orig = fs.readFileSync('./orig.txt').toString();
} catch (error) {
}

try {
    plain = fs.readFileSync('./plain.txt').toString();
} catch (error) {
}

try {
    key = fs.readFileSync('./key.txt').toString();
} catch (error) {
}

try {
    crypto = fs.readFileSync('./crypto.txt').toString();
  } catch (error) {
}

// TEXT PREPARER

function textPreparer(someText) {
    let preparedText = '';
    let lineCharCounter = 0
    let i = 0
    while (i < someText.length) {
        if (lineCharCounter == 64) {
            preparedText = preparedText + '\n'
            lineCharCounter = 0
        }
        else if(someText[i] == '\n') {
            i = i + 1
        }
        else {
            preparedText = preparedText + someText[i]
            i = i + 1
            lineCharCounter= lineCharCounter + 1
        }
        
    }
    fs.writeFile('plain.txt', preparedText, (err) => {
        if (err) throw err;
      });
}

// ENCRYPTION

function textCipherer(someText, someKey) {
    let preparedText = '';
    let lineCharCounter = 0
    let i = 0
    while (i < someText.length) {
        if (lineCharCounter == 64) {
            lineCharCounter = 0
        }
        else {
            preparedText = preparedText + String.fromCharCode((someText[i].charCodeAt() ^ someKey[lineCharCounter].charCodeAt()))
            i = i + 1
            lineCharCounter= lineCharCounter + 1
        }
        
    }

    fs.writeFile('crypto.txt', preparedText, (err) => {
        if (err) throw err;
    });
}

// DECRYPTION

let keyToFind = '';

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
        keyToFind = keyToFind + '?'
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
    let lenTest = 0
    let finalTextBins = [];
    while (lenTest < codeBins.length) {
      finalTextBins.push(
        codeBreaker(codeBins[lenTest])
      )
      lenTest = lenTest + 1
    }
    let finalText = ''
    let finalI = 0
    let finalTextPointer = 0
    let finalColumnIterator= 0
    // console.log(someText.length)
    // console.log(finalTextBins.flat().length)
    while (finalI < someText.length) {
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
    fs.writeFile('decrypt.txt', finalText, (err) => {
      if (err) throw err;
  });
}

// TASKS

if (taskType == '-p') {
    console.log("start przygotowania")
    textPreparer(orig);
    console.log("koniec przygotowywania")
}
if (taskType == '-e') {
    console.log("start szyfrowania")
    textCipherer(plain, key)
    console.log("koniec szyfrowania")
}
if (taskType == '-k') {
    console.log("start kryptoanalizy")
    codeBinder(crypto)
    console.log("koniec kryptoanalizy")
    console.log("znaleziony klucz")
    console.log(keyToFind)
}