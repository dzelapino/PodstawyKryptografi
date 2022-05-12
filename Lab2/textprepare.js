const fs = require('fs');

let orig;

try {
    orig = fs.readFileSync('./orig.txt').toString();
} catch (error) {
}

// console.log(orig.length)

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
    // console.log(preparedText)
    fs.writeFile('plain.txt', preparedText, (err) => {
        if (err) throw err;
      });
}

textPreparer(orig)