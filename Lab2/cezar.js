const cipherType = process.argv[2];
const taskType = process.argv[3];
const fs = require('fs');


let crypto;
let text;
let keys;
let keyFromFile;
let affineFactorFromFile;

try {
  crypto = fs.readFileSync('./crypto.txt').toString();
} catch (error) {
}

try {
  text = fs.readFileSync('./plain.txt').toString();
} catch (error) {
}

try {
  keys = fs.readFileSync('./key.txt').toString();
  keyFromFile = parseInt(keys.split(' ')[0], 10);
  affineFactorFromFile = parseInt(keys.split(' ')[1], 10);
} catch (error) {
}

// const text = fs.readFileSync('./plain.txt').toString();
// const keys = fs.readFileSync('./key.txt').toString();
// const crypto = fs.readFileSync('./crypto.txt').toString();

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

// const keyFromFile = parseInt(keys.split(' ')[0], 10);
// const affineFactorFromFile = parseInt(keys.split(' ')[1], 10);

function cipherAffine(str, key, affineFactor) {
  const m = 26;
  let solved = '';
  for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (nwd(affineFactor, m) != 1) {
      console.log('Klucz A jest niepoprawny');
      break;
    }
    if (key >= 26 || key < 0) {
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

function solveAffine(str, key, affineFactor) {
  const m = 26;
  const solveKey = reverse(affineFactor, m);
  let solved = '';
  for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (nwd(affineFactor, m) != 1) {
      console.log('Klucz A jest niepoprawny');
      break;
    }
    if (key >= 26 || key < 0) {
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

  return solved;
}

function writeAndSolveAffine(str, key, affineFactor) {
  const solved = solveAffine(str, key, affineFactor);
  fs.writeFile('decrypt.txt', solved, (err) => {
    if (err) throw err;
  });
}

function cipherCesar(str, key) {
  let solved = '';
  for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (key >= 26 || key < 0) {
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

function solveCesar(str, key) {
  let solved = '';
  for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (key >= 26 || key < 0) {
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

function writeAndSolveCesar(str, key) {
  const solved = solveCesar(str, key);
  fs.writeFile('decrypt.txt', solved, (err) => {
    if (err) throw err;
  });
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

function breakCesar(str) {
  let i = 0;
  let solutions = '';
  while (i <= 25) {
    solutions =
      solutions +
      'key: ' +
      i.toString() +
      ' solution: ' +
      solveCesar(str, i) +
      '\n';
    i = i + 1;
  }
  fs.writeFile('extra.txt', solutions, (err) => {
    if (err) throw err;
  });
  return solutions;
}

function breakAffine(str) {
  let i = 0;
  let solutions = '';
  const affineKeys = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  while (i <= 25) {
    let j = 0;
    while (j < affineKeys.length) {
      solutions =
        solutions +
        'key: ' +
        i.toString() +
        ' affineKey: ' +
        affineKeys[j].toString() +
        ' solution: ' +
        solveAffine(str, i, affineKeys[j]) +
        '\n';
      j = j + 1;
    }
    i = i + 1;
  }
  fs.writeFile('extra.txt', solutions, (err) => {
    if (err) throw err;
  });
  return solutions;
}

function breakCesarAndFindKey(str, ogText) {
  let i = 0;
  let solutions = '';
  while (i <= 25) {
    solutions =
      solutions +
      'key: ' +
      i.toString() +
      ' solution: ' +
      solveCesar(str, i) +
      '\n';
    i = i + 1;
  }
  fs.writeFile('extra.txt', solutions, (err) => {
    if (err) throw err;
  });
  const foundSolutions = solutions.split('\n');
  let iterator = 0;
  let trueKey = 'Key not found';
  while (iterator < foundSolutions.length) {
    const splitSolution = foundSolutions[iterator].split(' solution: ');
    const currentSolutionText = splitSolution[1];
    if (currentSolutionText == ogText) {
      trueKey = splitSolution[0];
    }
    iterator = iterator + 1;
  }
  fs.writeFile('key-found.txt', trueKey.split(' ')[1], (err) => {
    if (err) throw err;
  });
  return solutions;
}

function breakAffineAndFindKey(str, ogText) {
  let i = 0;
  let solutions = '';
  const affineKeys = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  while (i <= 25) {
    let j = 0;
    while (j < affineKeys.length) {
      solutions =
        solutions +
        'key: ' +
        i.toString() +
        ' affineKey: ' +
        affineKeys[j].toString() +
        ' solution: ' +
        solveAffine(str, i, affineKeys[j]) +
        '\n';
      j = j + 1;
    }
    i = i + 1;
  }
  fs.writeFile('extra.txt', solutions, (err) => {
    if (err) throw err;
  });
  const foundSolutions = solutions.split('\n');
  let iterator = 0;
  let trueKeys = 'Keys not found';
  let trueKey = 'Key not found';
  let trueAffineKey = 'Affine key not found';
  while (iterator < foundSolutions.length) {
    const splitSolution = foundSolutions[iterator].split(' solution: ');
    const currentSolutionText = splitSolution[1];
    if (currentSolutionText == ogText) {
      trueKeys = splitSolution[0].split(' ');
      trueKey = trueKeys[1];
      trueAffineKey = trueKeys[3];
    }
    iterator = iterator + 1;
  }
  fs.writeFile('key-found.txt', `${trueKey} ${trueAffineKey}`, (err) => {
    if (err) throw err;
  });
  return solutions;
}

if (cipherType == '-c') {
  if (taskType == '-e') {
    cipherCesar(text, keyFromFile);
  }
  if (taskType == '-d') {
    writeAndSolveCesar(crypto, keyFromFile);
  }
  if (taskType == '-j') {
    breakCesarAndFindKey(crypto, text);
  }
  if (taskType == '-k') {
    breakCesar(crypto);
  }
}

if (cipherType == '-a') {
  if (taskType == '-e') {
    cipherAffine(text, keyFromFile, affineFactorFromFile);
  }
  if (taskType == '-d') {
    writeAndSolveAffine(
      crypto,
      keyFromFile,
      affineFactorFromFile
    );
  }
  if (taskType == '-j') {
    breakAffineAndFindKey(
      crypto,
      text
    );
  }
  if (taskType == '-k') {
    breakAffine(crypto);
  }
}
