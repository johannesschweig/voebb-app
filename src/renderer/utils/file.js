const fs = require('fs')
const path = require('path')

// reads in a file asynchronously
export function readFileAsync (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, filePath), 'utf8', (err, contents) => {
      if (err) {
        reject(err)
      } else {
        resolve(contents.trim().split('\n'))
      }
    })
  })
}

// writes data to file asynchronously
export function writeFileAsync (filePath, data) {
  fs.writeFile(path.join(__dirname, filePath), data, function (err) {
    if (err) {
      return console.log(err)
    }
  })
}
