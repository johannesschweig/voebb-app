const https = require('https')

// returns a promise of a http request
export default function req (options, data = '', header = '') {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', chunk => {
        body += chunk.toString()
      })
      res.on('error', reject)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve(body)
        } else {
          reject(new Error('Request failed. status: ' + res.statusCode + ', body: ' + body))
        }
      })
    })
    req.on('error', reject)
    // if header present, set header
    if (header !== '') {
      // iterate over key-value pairs and set header
      for (let key in header) {
        req.setHeader(key, header[key])
      }
    }
    req.write(data, 'binary')
    req.end()
  })
}
