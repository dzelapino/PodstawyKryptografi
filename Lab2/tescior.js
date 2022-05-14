// let yourNumber = 'j';
// let yourNumber2 = 'x';
// let yourNumber3 = 'z';
// let yourNumber4 = '4';
// let spacja = ' ';
// let binString = yourNumber.charCodeAt();
// let binString2 = yourNumber2.charCodeAt()
// let binString3 = yourNumber3.charCodeAt()
// let binString4 = yourNumber4.charCodeAt()
// let binSpace = spacja.charCodeAt()
// console.log(binString.toString(2))
// console.log(binString2.toString(2))
// console.log(binString3.toString(2))
// console.log(binString4.toString(2))
// console.log(binSpace.toString(2))
// console.log("-------")
// console.log((binString ^ binString2).toString(2))
// console.log((binString ^ binString3).toString(2))
// console.log((binString2 ^ binString4).toString(2))
// console.log("+++++")
// console.log((binString ^ binSpace).toString(2))
// console.log((binString2 ^ binSpace).toString(2))
// console.log((binString3 ^ binSpace).toString(2))
// console.log((binString4 ^ binSpace).toString(2))
// console.log("--------")
// console.log(((binString ^ binSpace) ^ binSpace).toString(2))
// console.log(((binString2 ^ binSpace) ^ binSpace).toString(2))
// console.log(((binString3 ^ binSpace) ^ binSpace).toString(2))
// console.log(((binString4 ^ binSpace) ^ binSpace).toString(2))

const fs = require('fs');

let key;
let plain

try {
    key = fs.readFileSync('./key.txt').toString();
} catch (error) {
}

try {
    plain = fs.readFileSync('./plain.txt').toString();
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
  fs.writeFile('crypto.txt', preparedText, (err) => {
      if (err) throw err;
  });
}

textCipherer(plain, key)

let crypto;

try {
  crypto = fs.readFileSync('./crypto.txt').toString();
} catch (error) {
}

// textCipherer(crypto, key)

// console.log(plain.length)