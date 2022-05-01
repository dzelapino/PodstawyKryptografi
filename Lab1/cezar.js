const cipherType = process.argv[2];
const taskType = process.argv[3];
const fs = require('fs');
const text = fs.readFileSync('./plain.txt').toString();
const keys = fs.readFileSync('./key.txt').toString();

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

const key = parseInt(keys.split(' ')[0], 10);
const affineFactor = parseInt(keys.split(' ')[1], 10);

function cipherAffine(str) {
  const m = 26;
  let solved = '';
  for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (nwd(affineFactor, m) != 1) {
      console.log('Klucz A jest niepoprawny');
      break;
    }
    if (key >= 26 || key <= 0) {
      console.log('Klucz B jest niepoprawny');
      break;
    }

    if (asciiNum >= 65 && asciiNum <= 90) {
      asciiNum = (affineFactor * asciiNum + key) % m;
      solved += String.fromCharCode(asciiNum + 65);
    } else if (asciiNum >= 97 && asciiNum <= 122) {
      let fixedAscii = asciiNum - 32;
      asciiNum = (affineFactor * fixedAscii + key) % m;
      solved += String.fromCharCode(asciiNum + 97);
    } else {
      solved += str[i];
    }
  }
  fs.writeFile('crypto.txt', solved, (err) => {
    if (err) throw err;
  });

  return solved;
}

function solveAffine(str) {
  const m = 26;
  const solveKey = reverse(affineFactor, m);
  let solved = '';
  for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (nwd(affineFactor, m) != 1) {
      console.log('Klucz A jest niepoprawny');
      break;
    }
    if (key >= 26 || key <= 0) {
      console.log('Klucz B jest niepoprawny');
      break;
    }

    if (asciiNum >= 65 && asciiNum <= 90) {
      asciiNum = (solveKey * (asciiNum - key)) % m;
      solved += String.fromCharCode(asciiNum + 65);
    } else if (asciiNum >= 97 && asciiNum <= 122) {
      let fixedAscii = asciiNum - 32;
      let localAsciiNum = (solveKey * (fixedAscii - key)) % m;
      solved += String.fromCharCode(localAsciiNum + 97);
    } else {
      solved += str[i];
    }
  }
  fs.writeFile('decrypt.txt', solved, (err) => {
    if (err) throw err;
  });

  return solved;
}

function cipherCesar(str) {
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
  fs.writeFile('crypto.txt', solved, (err) => {
    if (err) throw err;
  });

  return solved;
}

function solveCesar(str) {
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
  fs.writeFile('decrypt.txt', solved, (err) => {
    if (err) throw err;
  });

  return solved;
}

function nwd(a, b) {
  while (a != b) {
    if (a < b) {
      temp = a;
      a = b;
      b = temp;
    }
    a = a - b;
  }
  return a;
}

function reverse(a, m) {
  let found = null;

  let i = 0;
  while (i <= m - 1) {
    let local = a * i;
    if (local % m == 1) {
      found = i;
    }
    i = i + 1;
  }
  return found;
}

let testString = 'ZYzy';
let solveString = 'XWHBIIBOhbiiboxw';

// console.log(text);
console.log(cipherAffine(text));
console.log(solveAffine(cipherAffine(text)));
// console.log(cipherCesar(text));
// console.log(solveCesar(cipherCesar(text)));
// console.log(solve(testString));
// console.log(solve(solve(testString)));

// console.log(process.argv[2]);
// console.log(process.argv[3]);

// console.log(reverse(3, 7));
