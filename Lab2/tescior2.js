const fs = require('fs');
const binaryLetter = `01110011`;
const binarySpace = "00100000";

// const outputStr = String.fromCharCode(parseInt(binary, 2));

function getOutputFromBinary(binary) {
  return String.fromCharCode(parseInt(binary, 2));
}

const binary = getOutputFromBinary(binarySpace);
const binary2 = getOutputFromBinary(binaryLetter);

// console.log(binary);
// console.log(binary2);

// console.log(binaryLetter[0]);

function spaceChecker(binaryChar) {
  if (binaryChar[1] == '0') {
    console.log("spacja");
  } else {
    console.log("no spacja");
  }
  // console.log(binaryChar)
}

let crypto;

try {
  crypto = fs.readFileSync('./crypto.txt').toString();
} catch (error) {
}

// console.log(crypto)

// someText[lineCharCounter].charCodeAt().toString(2)

function codeBreaker(textBin) {
  let i = 0
  while (i < textBin.length) {
    spaceChecker(textBin[i])
    // console.log(someText[i].charCodeAt().toString(2))
    i = i + 1
  }
}

// codeBreaker(crypto)

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
      
      codeBins[columnIterator].push(someText[i].charCodeAt().toString(2))

      columnIterator = columnIterator + 1
      i = i + 1
    }
  }
  // console.log(codeBins.length)
  let lenTest = 0
  while (lenTest < codeBins.length) {
    // console.log(codeBins[lenTest].length)
    codeBreaker(codeBins[lenTest])
    lenTest = lenTest + 1
  }
}

codeBinder(crypto)

// let testArrays = [ [1,2,3], [4,5,6,7,8] , [9]]
// let testI = 0
// while (testI < testArrays.length) {
//   console.log(testArrays[testI].length)
//   testI += 1
// }