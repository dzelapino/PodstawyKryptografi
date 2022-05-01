const cipherType = process.argv[2];
const taskType = process.argv[3];

if (cipherType != '-c' && cipherType != '-a') {
  console.log('Wrong cipher flag');
}

if (
  taskType != '-e' &&
  taskType != '-d' &&
  taskType != '-j' &&
  taskType != '-k'
) {
  console.log('Wrong task flag');
}

key = 6;

function cipher(str) {
  let solved = '';
  for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (key >= 26 || key <= 0) {
      console.log('Klucz jest niepoprawny');
      break;
    }

    if (asciiNum >= 65 && asciiNum <= 90) {
      if (asciiNum + key <= 90) {
        asciiNum = asciiNum + key;
        solved += String.fromCharCode(asciiNum);
      } else {
        asciiNum = asciiNum + key - 26;
        solved += String.fromCharCode(asciiNum);
      }
    } else if (asciiNum >= 97 && asciiNum <= 122) {
      if (asciiNum + key <= 122) {
        asciiNum = asciiNum + key;
        solved += String.fromCharCode(asciiNum);
      } else {
        asciiNum = asciiNum + key - 26;
        solved += String.fromCharCode(asciiNum);
      }
    } else {
      solved += str[i];
    }
  }
  return solved;
}

function solve(str) {
  let solved = '';
  for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (key >= 26 || key <= 0) {
      console.log('Klucz jest niepoprawny');
      break;
    }

    if (asciiNum >= 65 && asciiNum <= 90) {
      asciiNum = asciiNum - key;
      if (asciiNum < 65) {
        asciiNum = asciiNum + 26;
      }
      solved += String.fromCharCode(asciiNum);
    } else if (asciiNum >= 97 && asciiNum <= 127) {
      asciiNum = asciiNum - key;
      if (asciiNum < 97) {
        asciiNum = asciiNum + 26;
      }
      solved += String.fromCharCode(asciiNum);
    } else {
      solved += str[i];
    }
  }
  return solved;
}

let testString = 'ZYzy';
let solveString = 'XWHBIIBOhbiiboxw';

console.log(testString);
console.log(cipher(testString));
console.log(solve(cipher(testString)));
// console.log(solve(testString));
// console.log(solve(solve(testString)));

// console.log(process.argv[2]);
// console.log(process.argv[3]);
