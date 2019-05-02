import { landingPageOptions, searchPageOptions, resultsPageOptions, resultsPageData, resultPageOptions } from './requestOptions.js'
import { detailsBlacklist } from './constants.js'
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

// search for a searchTerm
// mocked: if the search should return fake/mocked result
export function search(term, mocked=false) {
    searchTerm = term

    if (!mocked) {
        // open landing page
        return req(landingPageOptions)
            .then(res => {
                // retrieve session from landing page
                session = getSession(res)
                console.log('session', session)
                // open search page
                return req(searchPageOptions(session))
            })
            .then(res => {
                console.log('searchPage successfull')
                // open search results page with search term
                return req(resultsPageOptions(session), resultsPageData(searchTerm))
            }).then(res => {
                // extract results from html
                let results = extractResult(res)
                console.log('resultsPage successfull:', results.length, 'results')
                return results
            })
            .catch((err) => { console.log("oh no: " + err)});
    } else {
        // reads a prepared html file and extracts the data
        // var fs = require('fs')
        // var path = require('path')
        // var html = fs.readFileSync(path.join(__dirname, '..', 'search.html'), { encoding: 'utf8' })
        // return Promise.resolve(extractResult(html))
        var json = [{"title":"E.T.A. Hoffmann : aus dem Leben eines skeptischen Phantasten ; [CD]","name":"E.T.A. Hoffmann. Regie: Martina Boette-Sonner. Gelesen von Rüdiger Safranski. Musik von E.T.A. Hoffmann","medium":"CD","year":"1998","img":"https://www.voebb.de/vlb/cover/9783895845581/s","link":"AK12594954","avail":"ist verfügbar"},{"title":"Das Beste vom Besten - Rüdiger Hoffmann live! : [DVD]","name":"Rüdiger Hoffmann. - Alive","medium":"DVD","year":"2006","link":"AK08226790","avail":"ist verfügbar"},{"title":"E. T. A. Hoffmann : das Leben eines skeptischen Phantasten","name":"Rüdiger Safranski. - Fischer-Taschenbuch-Verl.","medium":"Band","year":"2010","img":"https://www.voebb.de/vlb/cover/9783596143016/s","link":"AK00296406","avail":"ist verfügbar"},{"title":"Das Beste vom Besten - Rüdiger Hoffmann, live! : [DVD Video]","name":"Rüdiger Hoffmann. - P & C","medium":"DVD","year":"2007","img":"https://www.voebb.de/vlb/cover/4018939112042/s","link":"AK14168994","avail":"ist verfügbar"},{"title":"E. T. A. Hoffmann : das Leben eines skeptischen Phantasten","name":"Rüdiger Safranski. - Ungekürzte Ausg.. - Fischer-Taschenbuch-Verl.","medium":"Band","year":"2000","img":"https://www.voebb.de/vlb/cover/9783596143016/s","link":"AK09178412","avail":"ist verfügbar"},{"title":"E. T. A. Hoffmann : das Leben eines skeptischen Phantasten","name":"Rüdiger Safranski. - [2. Aufl.]. - Hanser","medium":"Buch","year":"1998","img":"https://www.voebb.de/vlb/cover/9783446138223/s","link":"AK12624329","avail":"ist verfügbar"},{"title":"E. T. A. Hoffmann : eine Biographie","name":"Rüdiger Safranski. - Rowohlt","medium":"Band","year":"1992","img":"https://www.voebb.de/vlb/cover/9783499132018/s","link":"AK00054442","avail":"ist verfügbar"},{"title":"E.T.A. Hoffmann : eine Biographie","name":"Rüdiger Safranski. - Rowohlt-Taschenbuch-Verl.","medium":"Band","year":"1991","img":"https://www.voebb.de/vlb/cover/9783499132018/s","link":"AK09084308","avail":"ist verfügbar"},{"title":"Musik und Wirklichkeit bei E. T. A. Hoffmann : zur Entstehung einer Musikanschauung der Romantik","name":"Wolfgang Rüdiger","medium":"Band","year":"1989","img":"https://www.voebb.de/vlb/cover/9783890853468/s","link":"AK11065167","avail":"ist zur Zeit nicht verfügbar"},{"title":"E. T. A. Hoffmann : das Leben eines skeptischen Phantasten","name":"Rüdiger Safranski. - Hanser","medium":"Buch","year":"1984","img":"https://www.voebb.de/vlb/cover/9783446138223/s","link":"AK02020127","avail":"ist verfügbar"},{"title":"Der Atem des Drachen : [DVD Video]","name":"Rüdiger Hoffmann [Sonst.]. Thomas Raab [Regie]. Bob Tode [Prod. ZDF]. Stephan Denzer [Red. ZDF]. ZDF. - Groove Attack","medium":"DVD","year":"2007","link":"AK14168978","avail":"ist verfügbar"},{"title":"Kostbarkeiten - Das Beste aus fünf Programmen : [CD]","name":"Rüdiger Hoffmann. - BMG Ariola","medium":"CD","year":"2005","link":"AK13853085","avail":"ist verfügbar"},{"title":"Sex oder Liebe : [DVD Video]","name":"Rüdiger Hoffmann. - Warner Music","medium":"DVD","year":"2008","link":"AK06205347","avail":"ist verfügbar"},{"title":"Obwohl ... : [Hörbuch] ; [CD]","name":"Rüdiger Hoffmann. - Edel","medium":"CD","year":"2010","img":"https://www.voebb.de/vlb/cover/4029759044123/s","link":"AK08243645","avail":"ist verfügbar"},{"title":"Obwohl ... : [DVD-Video]","name":"Rüdiger Hoffmann. - Edel","medium":"DVD","year":"2010","img":"https://www.voebb.de/vlb/cover/4029759044185/s","link":"AK06211149","avail":"ist verfügbar"},{"title":"Sex oder Liebe : [CD]","name":"Musik und Text: Rüdiger Hoffmann .... - Warner Music","medium":"CD","year":"2007","img":"https://www.voebb.de/vlb/cover/5051442328127/s","link":"AK06197053","avail":"ist verfügbar"},{"title":"Schandmäuler. - 1.. Comedy","name":"1.Aufl.","medium":"CD","year":"2002","link":"AK01203799","avail":"ist verfügbar"},{"title":"Ja uff erstmal... : Winnetou unter Comedy-Geiern ; [CD] ; [Hörbuch]","name":"Regie: Klaus-Dieter Fröhlich. Sprecher: Jürgen von der Lippe ; Rüdiger Hoffmann ; Herbert Knebel... Prod.: WDR. - BMG Wort","medium":"CD","year":"2000","img":"https://www.voebb.de/vlb/cover/9783898301411/s","link":"AK03316660","avail":"ist verfügbar"},{"title":"Es ist furchtbar, aber es geht","name":"Rüdiger Hoffmann ; Jürgen Becker. - Rüdiger Hoffmann/Jürgen Becker","medium":"CD","year":"1995","link":"AK01180783","avail":"ist verfügbar"},{"title":"Afrikanische Philosophie : Mythos und Realität","name":"Paulin J. Hountondji. Hrsg. von Gerd-Rüdiger Hoffmann. Aus dem Engl. von Christian Neugebauer und Franz M. Wimmer. Mit einem Essay von Gerd-Rüdiger Hoffmann und Christian\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tNeugebauer. - Dietz-Verl.","medium":"Buch","year":"1993","img":"https://www.voebb.de/vlb/cover/9783320018054/s","link":"AK01119324","avail":"ist verfügbar"},{"title":"Der Hauptgewinner : [CD]","name":"Rüdiger Hoffmann. - Rüdiger Hoffmann","medium":"CD","year":"1995","link":"AK01119438","avail":"ist verfügbar"},{"title":"Intelligente Signalverarbeitung","name":"Rüdiger Hoffmann ; Matthias Wolff. - Springer","medium":"Mehrteiliges Werk","year":"","img":"https://www.voebb.de/vlb/cover/9783662453223/s","link":"AK15876158","avail":"siehe Vollanzeige"}]
        return Promise.resolve(json)
    }
}

function extractAvailability(row) {
    // library
    let library = $('td:nth-of-type(1) a', row).text().trim()
    // if there is no a link
    if (!library) {
        library = $('td:nth-of-type(1)', row).text().trim()
    }
    // place
    let place = $('td:nth-of-type(2)', row).text().trim()
    // signature
    let signature = $('td:nth-of-type(3)', row).text().trim()
    // orderStatus
    let orderStatus = $('td:nth-of-type(4)', row).text().trim()
    // status
    let status = $('td:nth-of-type(5)', row).text().trim()
    // preferred libary
    let whitelist = ['ZLB: Amerika-Gedenkbibliothek (AGB)', 'Mitte: Bibliothek am Luisenbad', 'ZLB: Berliner Stadtbibliothek  (BStB)']
    let preferred = whitelist.includes(library)
    return {
        'library': library,
        'place': place,
        'signature': signature,
        'orderStatus': orderStatus,
        'status': status,
        'preferred': preferred
    }

}

// extracts the details from an entry html
function extractEntryDetails(html) {
    // extract details
    /// blacklist of unnecessary tags
    let details = []
    let rows = $('.gi tr', html)
    for (let i = 0; i < rows.length; i++) {
        let left = $('.spaltelinks', rows[i]).text().trim()
        let right = $('.spalterechts', rows[i]).text().trim()
        if (!detailsBlacklist.includes(left)) {
            details.push({ [left]: right })
        }
    }

    // extract availability
    var avail = []
    rows = $('#R08 tbody tr', html)
    for (let i = 0; i < rows.length; i++) {
        avail.push(extractAvailability(rows[i]))
    }
    return {
        'details': details,
        'availability': avail
    }
}

// returns the details for an entry
// mocked: if the search should return fake/mocked result
export function getEntryDetails(link, mocked=false) {
    if (!mocked) {
        return req(resultPageOptions(link))//, resultPageData, resultPageHeader)
            .then(res => {
                return res
            }).then(res => {
                let results = extractEntryDetails(res)
                return results
            })

    } else {
        // reads a prepared html file and extracts the data
        var fs = require('fs')
        var path = require('path')
        var html = fs.readFileSync(path.join(__dirname, '..', 'details.html'), { encoding: 'utf8' })
        return Promise.resolve(extractEntryDetails(html))
    }
}
