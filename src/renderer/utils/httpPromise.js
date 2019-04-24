const https = require('https')
const qs = require('querystring')

// returns a promise of a http request
export default function req(options, data = '') {
    return new Promise((resolve, reject) => {
        const req = https.request(options,
            (res) => {
                let body = ''
                res.on('data', (chunk) => (body += chunk.toString()))
                res.on('error', reject)
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode <= 299) {
                        resolve(body)
                    } else {
                        reject('Request failed. status: ' + res.statusCode + ', body: ' + body)
                    }
                })
            })
        req.on('error', reject)
        req.write(data, 'binary')
        req.end()
    })
}
