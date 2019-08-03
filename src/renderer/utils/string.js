// returns the current date string dd.mm.yyyy hh:mm
export function getCurrentDateString () {
  let date = new Date()
  let dateString = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
  return dateString
}

// returns a shorter version of the library name
export function shortenLibraryName (library) {
  let lib = library
  let colon = lib.indexOf(':')
  // remove everything after colon if any
  if (colon !== -1) {
    lib = lib.substring(colon + 2)
  }
  // remove everything after opening bracket
  let bracket = lib.indexOf('(')
  if (bracket !== -1) {
    lib = lib.substring(0, bracket - 1)
  }
  lib = lib.replace('Bibl.', 'Bibliothek')
  lib = lib.replace('Ju.bibl.', 'Jugendbibliothek')
  return lib
}

// sanitizes details, removes unncessary content
// key: key of the content
// value: value of the content
// returns a sanitized value
export function sanitizeDetail (key, value) {
  switch (key) {
    // remove dashes from isbn
    case 'ISBN': return value.replace(/-/g, '')
    // remove everthing after special character
    case 'Titel':
      let specialChars = [';', '[', '(']
      let stop = []
      // find earliest stopping special character
      specialChars.forEach(char => {
        if (value.indexOf(char) !== -1) {
          stop.push(value.indexOf(char))
        }
      })
      // shorten string
      if (stop.length === 0) {
        return value
      } else {
        return value.slice(0, Math.min(...stop))
      }
    default: return value
  }
}

// computes the days due until the book is available from a string ("Ausgeliehen - Fällig am: 8.7.2019")
export function getDaysDue (avail) {
  if (avail.indexOf(':') === -1) {
    console.log('Days due cannot be computed for', avail)
    return -99
  }
  let start = avail.indexOf(':') + 2
  let date
  // no additional statement
  let addStatement = avail.slice(start).indexOf(' - ')
  if (addStatement === -1) {
    date = avail.substr(start)
  } else {
    date = avail.substr(start, addStatement)
  }
  let parts = date.split('.')
  let date2 = new Date(parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0'))
  if (isNaN(date2)) {
    console.log('Days due cannot be computed for', avail)
    return -99
  }
  let now = new Date()
  // getTimezoneOffset(): -120
  now = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000)
  now.setUTCHours(0, 0, 0, 0)
  return Math.round(date2.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
}

// returns an availability object for ('available', 'x more days')
export function getAvailability (copies, preferredLibraries) {
  // show only copies from preferred libraries
  let avail = copies.filter(obj => preferredLibraries.includes(obj.library))
  let available = avail.filter(obj => {
    return obj.status.toLowerCase().startsWith('verfügbar') || obj.status === 'ist verfügbar'
  }).length > 0
  if (available) {
    return {
      days: 0,
      message: 'available'
    }
  } else {
    let notAvail = ['Nicht im Regal', 'Reserviert', 'Ausgeliehen', 'siehe Vollanzeige']
    avail = avail.filter(obj => notAvail.indexOf(obj.status) === -1)
    if (avail.length === 0) {
      return {
        days: Number.MAX_SAFE_INTEGER,
        message: 'not available'
      }
    }
    let dd = avail.map(obj => getDaysDue(obj.status))
    return {
      days: Math.min(...dd),
      message: `${Math.min(...dd)} days left`
    }
  }
}
