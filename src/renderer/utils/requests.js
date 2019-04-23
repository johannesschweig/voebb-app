const $ = require('cheerio')
var session
var searchTerm

function getSession(html) {
    let start = html.indexOf("jsessionid=") + "jsessionid=".length
    let end = html.indexOf("?", start)
    return html.substr(start, end-start)
}

function landingPage() {
    var https = require('https')

    var options = {
        'method': 'GET',
        'hostname': 'voebb.de',
        'path': '/aDISWeb/app?service=direct%2F0%2FHome%2F%24DirectLink&sp=SPROD00',
        'headers': {
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }
    }

    var req = https.request(options, function (res) {
        var chunks = []

        res.on('data', function (chunk) {
            chunks.push(chunk)
        })

        res.on('end', function (chunk) {
            var body = Buffer.concat(chunks)
            session = getSession(body.toString())
            console.log('session', session)
            searchPage()
        })

        res.on('error', function (error) {
            console.error(error)
        })
    })

    req.end()
}

function searchPage() {
    var https = require('https');

    var options = {
      'method': 'GET',
      'hostname': 'voebb.de',
      'path': '/aDISWeb/app;jsessionid='+session+'?service=direct%2F1%2FPOOLOP00vb%40%40%40%40%40%40_4B002E00_369D3380%2F%24Tree.treeNodes&sp=SS1&requestCount=0',
      'headers': {
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
      }
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        // console.log(body.toString());
        console.log('searchPage successfull')
        startSearch()
      });

      res.on("error", function (error) {
        console.error(error);
      });
    });

    req.end();
}

function startSearch() {
    var https = require('https');

    var qs = require('querystring');

    var options = {
      'method': 'POST',
      'hostname': 'voebb.de',
      'path': '/aDISWeb/app;jsessionid='+session,
      'headers': {
        'Origin': 'https://voebb.de',
        'Upgrade-Insecure-Requests': '1',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
      }
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks)
        console.log('search successfull')
        extractResult(body.toString())
      });

      res.on("error", function (error) {
        console.error(error);
      });
    });

    var postData = qs.stringify({
      '$Autosuggest': searchTerm,
      '$FormConditional': 'T',
      'Form0': 'focus,keyCode,stz,source,selected,requestCount,scriptEnabled,scrollPos,scrDim,winDim,imgDim,$Toolbar,SAA1_SUCHIN_3,select,select$0,$Autosuggest,$Textfield,$Textfield$0,$FormConditional,textButton,$Toolbar$0',
      'SAA1_SUCHIN_3': 'on',
      'focus': '$$GFBO_1',
      'imgDim': '',
      'keyCode': '84',
      'requestCount': '1',
      'scrDim': '1920;1080',
      'scriptEnabled': 'true',
      'scrollPos': '648',
      'select': '',
      'select$0': '',
      'selected': '',
      'service': 'direct/1/POOLOP00vb@@@@@@_44000400_369D3380/$Form.form',
      'source': '',
      'sp': 'S0',
      'stz': '',
      'textButton': 'Suche starten',
      'winDim': '952;966'
    });

    req.write(postData);

    req.end();
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
    console.log(data)
    return data
}

export default function search(term) {
    searchTerm = term
    // TODO refactor callbacks to promises
    // landingPage()
    // TODO mocked html
    var fs = require('fs')
    var path = require('path')
    var html = fs.readFileSync(path.join(__dirname, '..', 'search.html'), { encoding: 'utf8' })
    return extractResult(html)
}
