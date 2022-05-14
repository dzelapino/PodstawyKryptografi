const fs = require('fs');

let crypto;
let key;

try {
    key = fs.readFileSync('./key.txt').toString();
} catch (error) {
}

try {
  crypto = fs.readFileSync('./crypto.txt').toString();
} catch (error) {
}

function textCipherer(someText, someKey) {
    let preparedText = '';
    let lineCharCounter = 0
    let i = 0
    while (i < someText.length) {
        if (lineCharCounter == 64) {
          // LINIJKA DO ODKOMENTOWANIA JAK STWIERDZI ZE JEDNAK MA BYC Z NEWLINE
            // preparedText = preparedText + '\n'
            lineCharCounter = 0
            // i = i + 1    // to na wszelki jesli sie rozjuszy podszas deszyfrowania
        }
        // else if(someText[i] == '\n') {
        //     i = i + 1
        // }
        else {
            preparedText = preparedText + String.fromCharCode((someText[i].charCodeAt() ^ someKey[lineCharCounter].charCodeAt()))
            i = i + 1
            lineCharCounter= lineCharCounter + 1
        }
        
    }
    fs.writeFile('tesciooor.txt', preparedText, (err) => {
        if (err) throw err;
    });
  }

textCipherer(crypto, key)