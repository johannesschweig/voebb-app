const qs = require('querystring')

// request options for landing page
export const landingPageOptions = {
    'method': 'GET',
    'hostname': 'voebb.de',
    'path': '/aDISWeb/app?service=direct%2F0%2FHome%2F%24DirectLink&sp=SPROD00',
    'headers': {
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    }
}

// request options for search page
export function searchPageOptions(session) {
    return {
        'method': 'GET',
        'hostname': 'voebb.de',
        'path': '/aDISWeb/app;jsessionid='+session+'?service=direct%2F1%2FPOOLOP00vb%40%40%40%40%40%40_4B002E00_369D3380%2F%24Tree.treeNodes&sp=SS1&requestCount=0',
        'headers': {
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }
    }
}

//request options for results page
export  function resultsPageOptions(session) {
    return {
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
    }
}

// request data for results page
export function resultsPageData(searchTerm) {
    return qs.stringify({
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
    })
}

export function resultPageOptions(link) {
    return {
        'method': 'GET',
        'hostname': 'voebb.de',
        'path': '/aDISWeb/app?service=direct%2F0%2FHome%2F%24DirectLink&sp=SPROD00&sp=S' + link,
        'headers': {
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,de;q=0.8',
            'Cookie': 'TS01b85d9e=01d33437f9ff0173042a02e2f57dfecd3489ef8d35f381632ab5394981ce8c6f8821bacb66a902f2f900e0acc8831841140b447118'
        }
    }
}
