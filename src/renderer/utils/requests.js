import { landingPageOptions, searchPageOptions, resultsPageOptions, resultsPageData, resultPageOptions, nextPageOptions, nextPageData } from './requestOptions.js'
import { detailsBlacklist, TOO_MANY_HITS, NO_HITS } from './constants.js'
import { extractYear } from './string.js'
import req from './httpPromise.js'
const $ = require('cheerio')

var session
var searchTerm

function getSession (html) {
  let start = html.indexOf('jsessionid=') + 'jsessionid='.length
  let end = html.indexOf('?', start)
  return html.substr(start, end - start)
}

// returns number of pages from search results page
// each page holds 22 entries
function getNumberOfPages (html) {
  let hits = $('#R06 > p > span', html).text()
  hits = parseInt(hits.substr(hits.indexOf('von') + 4))
  let pages = (hits - hits % 22) / 22 + 1
  return pages
}

// extracts all the fields from a single result row
function extractFields (row) {
  // image cover (if any)
  let img = $('.img-delayed', row).attr('data-src')
  // medium (CD, Buch,...)
  let medium = $('.rList_medium > img', row).attr('title')
  // title
  let title = $('.rList_titel > a', row).text()
  // identifier, e.g. javascript:htmlOnLink('AK15216034')
  let identifier = $('.rList_titel > a', row).attr('href')
  identifier = identifier.match(/'([^']+)'/)[1]
  // name
  let name = $('.rList_name:nth-child(4)', row).text()
  // year
  let year = $('.rList_jahr', row).text()
  if (year === '') {
    year = 0
  } else {
    year = parseInt(year)
  }
  return {
    'title': title,
    'name': name,
    'medium': medium,
    'year': year,
    'img': img,
    'identifier': identifier
  }
}

// extracts the results from the html
function extractResult (html) {
  let data = []
  var rows = $('.rList > li', html)
  for (let i = 0; i < rows.length; i++) {
    data.push(extractFields(rows[i]))
  }
  return data
}

// search for a searchTerm
// mocked: if the search should return fake/mocked result
export function search (term, mocked = false) {
  searchTerm = term

  if (!mocked) {
    // open landing page
    return req(landingPageOptions)
      .then(res => {
        // retrieve session from landing page
        session = getSession(res)
        console.log('Session', session)
        // open search page
        return req(searchPageOptions(session))
      })
      .then(() => {
        console.log('SearchPage successfull')
        // open search results page with search term
        return req(resultsPageOptions(session), resultsPageData(searchTerm))
      }).then(html => {
        // check for no hits or too many hits
        let rzero = $('#R01', html)
        if (rzero.length !== 0) {
          // no hits
          if (rzero.html().includes('Ihre Suche im Verbund erzielte keinen Treffer')) {
            console.log('No hits for', term)
            return NO_HITS
          } else if (rzero.html().includes('Zuviele Treffer')) {
            console.log('Too many hits for', term)
            return TOO_MANY_HITS
          }
        }
        // redirected to entry details page
        if ($('.rList > li', html).length === 0 && $('.gi > tbody > tr', html).length > 0) {
          let results = extractEntryDetails(html)
          // extract identifier
          let id = $('.gi tr:nth-of-type(1) td a', html).attr('href')
          id = id.substring(id.lastIndexOf('=') + 2)
          console.log('Redirected to entry details page of', results.details['Titel'])
          // parse year
          let year = results.details['Veröffentlichung']
          year = extractYear(year) 

          return [
            {
              'title': results.details['Titel'],
              'name': results.details['Verfasser'],
              'medium': results.details['Medienart'],
              'year': year,
              'img': null,
              'identifier': id
            }
          ]
        } else {
          // extract results from html
          let results = extractResult(html)
          console.log('ResultsPage successfull:', results.length, 'results')

          // extract results from subsequent pages
          // there is only one page
          if (results.length < 22) {
            return results
          } else {
            let pages = getNumberOfPages(html)
            
          }
          // return results

          // let promises = []
          // data.map(bookmark => {
            // promises.push(req(nextPageOptions(session), nextPageData))
          // })
          // return Promise.all(promises)
          // return results
          return req(nextPageOptions(session), nextPageData)
          .then(html => {
            console.log(html)
            results = results.concat(extractResult(html))
            console.log(results[22])
            return results
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    // reads a prepared html file and extracts the data
    // var fs = require('fs')
    // var path = require('path')
    // var html = fs.readFileSync(path.join(__dirname, '..', 'search.html'), { encoding: 'utf8' })
    // return Promise.resolve(extractResult(html))
    var json = [{'title': 'E.T.A. Hoffmann : aus dem Leben eines skeptischen Phantasten ; [CD]', 'name': 'E.T.A. Hoffmann. Regie: Martina Boette-Sonner. Gelesen von Rüdiger Safranski. Musik von E.T.A. Hoffmann', 'medium': 'CD', 'year': 1998, 'img': 'https://www.voebb.de/vlb/cover/9783895845581/s', 'identifier': 'AK12594954' }, {'title': 'Das Beste vom Besten - Rüdiger Hoffmann live! : [DVD]', 'name': 'Rüdiger Hoffmann. - Alive', 'medium': 'DVD', 'year': 2006, 'identifier': 'AK08226790', 'avail': 'ist verfügbar'}, {'title': 'E. T. A. Hoffmann : das Leben eines skeptischen Phantasten', 'name': 'Rüdiger Safranski. - Fischer-Taschenbuch-Verl.', 'medium': 'Band', 'year': 2010, 'img': 'https://www.voebb.de/vlb/cover/9783596143016/s', 'identifier': 'AK00296406', 'avail': 'ist verfügbar'}, {'title': 'Das Beste vom Besten - Rüdiger Hoffmann, live! : [DVD Video]', 'name': 'Rüdiger Hoffmann. - P & C', 'medium': 'DVD', 'year': 2007, 'img': 'https://www.voebb.de/vlb/cover/4018939112042/s', 'identifier': 'AK14168994', 'avail': 'ist verfügbar'}, {'title': 'E. T. A. Hoffmann : das Leben eines skeptischen Phantasten', 'name': 'Rüdiger Safranski. - Ungekürzte Ausg.. - Fischer-Taschenbuch-Verl.', 'medium': 'Band', 'year': 2000, 'img': 'https://www.voebb.de/vlb/cover/9783596143016/s', 'identifier': 'AK09178412', 'avail': 'ist verfügbar'}, {'title': 'E. T. A. Hoffmann : das Leben eines skeptischen Phantasten', 'name': 'Rüdiger Safranski. - [2. Aufl.]. - Hanser', 'medium': 'Buch', 'year': 1998, 'img': 'https://www.voebb.de/vlb/cover/9783446138223/s', 'identifier': 'AK12624329', 'avail': 'ist verfügbar'}, {'title': 'E. T. A. Hoffmann : eine Biographie', 'name': 'Rüdiger Safranski. - Rowohlt', 'medium': 'Band', 'year': 1992, 'img': 'https://www.voebb.de/vlb/cover/9783499132018/s', 'identifier': 'AK00054442', 'avail': 'ist verfügbar'}, {'title': 'E.T.A. Hoffmann : eine Biographie', 'name': 'Rüdiger Safranski. - Rowohlt-Taschenbuch-Verl.', 'medium': 'Band', 'year': 1991, 'img': 'https://www.voebb.de/vlb/cover/9783499132018/s', 'identifier': 'AK09084308', 'avail': 'ist verfügbar'}, {'title': 'Musik und Wirklichkeit bei E. T. A. Hoffmann : zur Entstehung einer Musikanschauung der Romantik', 'name': 'Wolfgang Rüdiger', 'medium': 'Band', 'year': 1989, 'img': 'https://www.voebb.de/vlb/cover/9783890853468/s', 'identifier': 'AK11065167', 'avail': 'ist zur Zeit nicht verfügbar'}, {'title': 'E. T. A. Hoffmann : das Leben eines skeptischen Phantasten', 'name': 'Rüdiger Safranski. - Hanser', 'medium': 'Buch', 'year': 1984, 'img': 'https://www.voebb.de/vlb/cover/9783446138223/s', 'identifier': 'AK02020127', 'avail': 'ist verfügbar'}, {'title': 'Der Atem des Drachen : [DVD Video]', 'name': 'Rüdiger Hoffmann [Sonst.]. Thomas Raab [Regie]. Bob Tode [Prod. ZDF]. Stephan Denzer [Red. ZDF]. ZDF. - Groove Attack', 'medium': 'DVD', 'year': 2007, 'identifier': 'AK14168978', 'avail': 'ist verfügbar'}, {'title': 'Kostbarkeiten - Das Beste aus fünf Programmen : [CD]', 'name': 'Rüdiger Hoffmann. - BMG Ariola', 'medium': 'CD', 'year': 2005, 'identifier': 'AK13853085', 'avail': 'ist verfügbar'}, {'title': 'Sex oder Liebe : [DVD Video]', 'name': 'Rüdiger Hoffmann. - Warner Music', 'medium': 'DVD', 'year': 2008, 'identifier': 'AK06205347', 'avail': 'ist verfügbar'}, {'title': 'Obwohl ... : [Hörbuch] ; [CD]', 'name': 'Rüdiger Hoffmann. - Edel', 'medium': 'CD', 'year': 2010, 'img': 'https://www.voebb.de/vlb/cover/4029759044123/s', 'identifier': 'AK08243645', 'avail': 'ist verfügbar'}, {'title': 'Obwohl ... : [DVD-Video]', 'name': 'Rüdiger Hoffmann. - Edel', 'medium': 'DVD', 'year': 2010, 'img': 'https://www.voebb.de/vlb/cover/4029759044185/s', 'identifier': 'AK06211149', 'avail': 'ist verfügbar'}, {'title': 'Sex oder Liebe : [CD]', 'name': 'Musik und Text: Rüdiger Hoffmann .... - Warner Music', 'medium': 'CD', 'year': 2007, 'img': 'https://www.voebb.de/vlb/cover/5051442328127/s', 'identifier': 'AK06197053', 'avail': 'ist verfügbar'}, {'title': 'Schandmäuler. - 1.. Comedy', 'name': '1.Aufl.', 'medium': 'CD', 'year': 2002, 'identifier': 'AK01203799', 'avail': 'ist verfügbar'}, {'title': 'Ja uff erstmal... : Winnetou unter Comedy-Geiern ; [CD] ; [Hörbuch]', 'name': 'Regie: Klaus-Dieter Fröhlich. Sprecher: Jürgen von der Lippe ; Rüdiger Hoffmann ; Herbert Knebel... Prod.: WDR. - BMG Wort', 'medium': 'CD', 'year': 2000, 'img': 'https://www.voebb.de/vlb/cover/9783898301411/s', 'identifier': 'AK03316660', 'avail': 'ist verfügbar'}, {'title': 'Es ist furchtbar, aber es geht', 'name': 'Rüdiger Hoffmann ; Jürgen Becker. - Rüdiger Hoffmann/Jürgen Becker', 'medium': 'CD', 'year': 1995, 'identifier': 'AK01180783', 'avail': 'ist verfügbar'}, {'title': 'Afrikanische Philosophie : Mythos und Realität', 'name': 'Paulin J. Hountondji. Hrsg. von Gerd-Rüdiger Hoffmann. Aus dem Engl. von Christian Neugebauer und Franz M. Wimmer. Mit einem Essay von Gerd-Rüdiger Hoffmann und Christian\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tNeugebauer. - Dietz-Verl.', 'medium': 'Buch', 'year': 1993, 'img': 'https://www.voebb.de/vlb/cover/9783320018054/s', 'identifier': 'AK01119324', 'avail': 'ist verfügbar'}, {'title': 'Der Hauptgewinner : [CD]', 'name': 'Rüdiger Hoffmann. - Rüdiger Hoffmann', 'medium': 'CD', 'year': 1995, 'identifier': 'AK01119438', 'avail': 'ist verfügbar'}, {'title': 'Intelligente Signalverarbeitung', 'name': 'Rüdiger Hoffmann ; Matthias Wolff. - Springer', 'medium': 'Mehrteiliges Werk', 'year': 0, 'img': 'https://www.voebb.de/vlb/cover/9783662453223/s', 'identifier': 'AK15876158' }]
    return Promise.resolve(json)
  }
}

// extracts the attributes of a copy from an html row
// row: html row
// header: order of the columns
function extractCopy (row, header) {
  // library
  let library = $('td:nth-of-type(' + header[0] + ') a', row).text().trim()
  // if there is no a link
  if (!library) {
    library = $('td:nth-of-type(' + header[0] + ')', row).text().trim()
  }
  // place
  let place = $('td:nth-of-type(' + header[1] + ')', row).text().trim()
  // signature
  let signature = $('td:nth-of-type(' + header[2] + ')', row).text().trim()
  // orderStatus
  let orderStatus = $('td:nth-of-type(' + header[3] + ')', row).text().trim()
  // status
  let status = $('td:nth-of-type(' + header[4] + ')', row).text().trim()
  return {
    'library': library,
    'place': place,
    'signature': signature,
    'orderStatus': orderStatus,
    'status': status
  }
}

// extracts the details from an entry html
function extractEntryDetails (html) {
  // extract details
  let details = {}
  let rows = $('.gi tr', html)
  for (let i = 0; i < rows.length; i++) {
    let left = $('.spaltelinks', rows[i]).text().trim()
    let right = $('.spalterechts', rows[i]).text().trim()
    if (right[0] === '[' && right.slice(-1) === ']') {
      right = right.slice(1, -1)
    }
    // blacklist of unnecessary tags
    if (!detailsBlacklist.includes(left)) {
      details[left] = right
    }
  }
  // extract image
  let img = $('#R001 img', html).attr('src')
  // check for rating image
  if (img.indexOf('Sterne.gif') === -1) {
    details.img = `https://voebb.de${img}`
  } else {
    img = ''
  }

  // extract all copies
  var copies = []
  // check presence and order of columns
  let header = [0, 0, 0, 0, 0]
  for (let i = 1; i <= $('th[scope="col"]', html).length; i++) {
    switch ($('th[scope="col"]:nth-child(' + i + ')', html).text()) {
      case 'Bibliothek': header[0] = i
        break
      case 'Standort': header[1] = i
        break
      case 'Signatur': header[2] = i
        break
      case 'Bestellmöglichkeit': header[3] = i
        break
      case 'Status': header[4] = i
        break
    }
  }
  rows = $('#R08 tbody tr', html)
  for (let i = 0; i < rows.length; i++) {
    copies.push(extractCopy(rows[i], header))
  }
  return {
    'details': details,
    'copies': copies
  }
}

// returns the details for an entry
// mocked: if the search should return fake/mocked result
export function getEntryDetails (identifier, mocked = false) {
  if (!mocked) {
    return req(resultPageOptions(identifier))
      .then(res => {
        return res
      }).then(html => {
        let results = extractEntryDetails(html)
        results.identifier = identifier
        return results
      })
  } else {
    // reads a prepared html file and extracts the data
    var fs = require('fs')
    var path = require('path')
    let html = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'mocks', 'AK15650473.html'), { encoding: 'utf8' })
    let results = extractEntryDetails(html)
    results.identifier = identifier
    return Promise.resolve([results])
  }
}