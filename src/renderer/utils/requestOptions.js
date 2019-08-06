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
export function searchPageOptions (session) {
  return {
    'method': 'GET',
    'hostname': 'voebb.de',
    'path': '/aDISWeb/app;jsessionid=' + session + '?service=direct%2F1%2FPOOLOP00vb%40%40%40%40%40%40_4B002E00_369D3380%2F%24Tree.treeNodes&sp=SS1&requestCount=0',
    'headers': {
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    }
  }
}

// request options for results page
export function resultsPageOptions (session) {
  return {
    'method': 'POST',
    'hostname': 'voebb.de',
    'path': '/aDISWeb/app;jsessionid=' + session,
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
export function resultsPageData (searchTerm) {
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

// request options for the next results page
export function nextPageOptions (session) {
  return {
    'method': 'POST',
    'hostname': 'voebb.de',
    'path': '/aDISWeb/app;jsessionid=' + session,
    'headers': {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    }
  }
}

// request data for the next results page
// page: number of the page starting with 2 for the second page
export const nextPageData = function (page) {
  return qs.stringify({
    'service': 'direct/1/POOLOP00vb@@@@@@_44274D00_369D3380/$Form.form',
    'sp': 'S0',
    'Form0': 'focus,keyCode,stz,source,selected,requestCount,scriptEnabled,scrollPos,scrDim,winDim,imgDim,$Textfield,$FormConditional,textButton,$FormConditional$0,textButton$0,$FormConditional$1,textButton$1,$FormConditional$2,textButton$2,$FormConditional$3,textButton$3,$FormConditional$4,textButton$4,$FormConditional$5,textButton$5,$FormConditional$6,textButton$6,textButton$7,textButton$8,textButton$9,textButton$10,textButton$11,textButton$12,$FormConditional$7,textButton$13,$Toolbar,cellCheck,cellCheck$0,cellCheck$1,cellCheck$2,cellCheck$3,cellCheck$4,cellCheck$5,cellCheck$6,cellCheck$7,cellCheck$8,cellCheck$9,cellCheck$10,cellCheck$11,cellCheck$12,cellCheck$13,cellCheck$14,cellCheck$15,cellCheck$16,cellCheck$17,cellCheck$18,cellCheck$19,cellCheck$20,$Toolbar$0',
    'focus': '',
    'keyCode': '0',
    'stz': '',
    'source': '',
    'selected': '',
    'requestCount': page,
    'scriptEnabled': 'true',
    'scrollPos': '228',
    'scrDim': '1920;1080',
    'winDim': '1853;468',
    'imgDim': '',
    '$FormConditional': 'T',
    '$FormConditional$0': 'T',
    '$FormConditional$1': 'T',
    '$FormConditional$2': 'T',
    '$FormConditional$3': 'T',
    '$FormConditional$4': 'T',
    '$FormConditional$5': 'T',
    '$FormConditional$6': 'F',
    '$FormConditional$7': 'T',
    '$Textfield': '',
    '$Toolbar_5.x': 12 + page,
    '$Toolbar_5.y': 15 - page
  })
}

export function resultPageOptions (identifier) {
  return {
    'method': 'GET',
    'hostname': 'voebb.de',
    'path': '/aDISWeb/app?service=direct%2F0%2FHome%2F%24DirectLink&sp=SPROD00&sp=S' + identifier,
    'headers': {
      'Connection': 'keep-alive',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9,de;q=0.8',
    }
  }
}
