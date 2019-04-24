import { landingPageOptions, searchPageOptions, resultsPageOptions, resultsPageData} from './requestOptions.js'
import req from './httpPromise.js'
const $ = require('cheerio')

var session
var searchTerm

function getSession(html) {
    let start = html.indexOf("jsessionid=") + "jsessionid=".length
    let end = html.indexOf("?", start)
    return html.substr(start, end-start)
}

// extracts all the fields from a single result row
function extractFields(row) {
    // image cover (if any)
    let img = $('.img-delayed', row).attr('data-src')
    // medium (CD, Buch,...)
    let medium = $('.rList_medium > img', row).attr('title')
    // title
    let title = $('.rList_titel > a', row).text()
    // link
    let link =  $('.rList_titel > a', row).attr('href')
    link = link.match(/'([^']+)'/)[1]
    // available
    let avail = $('.rList_availability > span > img', row).attr('alt')
    // name
    let name = $('.rList_name:nth-child(4)', row).text()
    // year
    let year = $('.rList_jahr', row).text()
    return {
        'title': title,
        'name': name,
        'medium': medium,
        'year': year,
        'img': img,
        'link': link,
        'avail': avail,
    }
}

// extracts the results from the html
function extractResult(html) {
    let data = []
    var rows = $('.rList > li', html)
    // console.log(rows.length + ' rows found')
    for (let i = 0; i < rows.length; i++) {
        data.push(extractFields(rows[i]))
    }
    // console.log(data)
    return data
}

export default function search(term) {
    searchTerm = term
    // TODO refactor callbacks to promises

    return req(landingPageOptions)
        .then(res => {
            session = getSession(res)
            console.log('session', session)
            return req(searchPageOptions(session))
        })
        .then(res => {
            console.log('searchPage successfull')
            // console.log('res:', res)
            return req(resultsPageOptions(session), resultsPageData(searchTerm))
        }).then(res => {
            let results = extractResult(res)
            console.log('resultsPage successfull:', results.length, 'results')
            return results
        })
        .catch((err) => { console.log("oh no: " + err)});

                    // searchPage()
    // TODO mocked html
    // var fs = require('fs')
    // var path = require('path')
    // var html = fs.readFileSync(path.join(__dirname, '..', 'search.html'), { encoding: 'utf8' })
    // return extractResult(html)
}
