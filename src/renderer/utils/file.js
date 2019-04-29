const fs = require('fs')

// reads in a file asynchronously
export function readFileAsync(path) {
    return new Promise(function(resolve, reject){
        fs.readFile(__dirname + path, 'utf8', (err, contents) => {
            if (err) {
                reject(err)
            } else {
                resolve(contents.trim().split('\n'))
            }
        })
    })
}

// writes data to file asynchronously
export function writeFileAsync(path, data) {
    fs.writeFile(__dirname + path, data, function(err, contents) {
        if(err) {
            return console.log(err)
        }
    })
}
