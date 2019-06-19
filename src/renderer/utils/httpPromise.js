const https = require('https')
const timeout = new Error('Request timeout')

// returns a promise of a http request
function request (options, data, header) {
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
          reject(new Error('Request failed. Status: ' + res.statusCode + ', body: ' + body))
        }
      })
    })
    req.setTimeout(3000)
    req.on('timeout', () => reject(timeout))
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

export default function req (options, data = '', header = '') {
  return new Promise((resolve, reject) => {
    request(options, data, header)
      .then(res => resolve(res))
      .catch(() => {
        console.log('Restart request (2nd time)')
        request(options, data, header)
          .then(res => resolve(res))
          .catch(() => {
            console.log('Restart request (3rd time)')
            request(options, data, header)
              .then(res => resolve(res))
              .catch(() => reject(new Error('Request timeout (3rd time)')))
          })
      })
  })
}
