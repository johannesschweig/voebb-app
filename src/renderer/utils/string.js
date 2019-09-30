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

// adds availability to results
export function addAvailability (results, preferredLibraries) {
  return results.map(result => {
    // consider only copies from preferred libraries
    let copies = result.copies.filter(obj => preferredLibraries.includes(obj.library))

    return {
      ...result,
      availability: getCondensedAvailability(copies)
    }
  })
}

// returns an availability object for multiple copies ('available', 'x more days')
export function getCondensedAvailability (copies) {
  // empty array
  if (!copies.length) {
    return { days: Number.MAX_SAFE_INTEGER, message: 'not available' }
  }
  return copies.sort((a, b) => a.availability.days - b.availability.days)[0].availability
}

// returns a days and message object for a copy's status
export function getAvailability (status) {
  status = status.toLowerCase()
  if (status.startsWith('verfügbar') || status === 'ist verfügbar') {
    return {
      days: -Number.MAX_SAFE_INTEGER,
      message: 'available'
    }
  }
  switch (status) {
    case 'nicht im regal':
      return {
        days: Number.MAX_SAFE_INTEGER,
        message: 'lost'
      }
    case 'reserviert':
      return {
        days: Number.MAX_SAFE_INTEGER,
        message: 'reserved'
      }
    case 'ausgeliehen':
      return {
        days: Number.MAX_SAFE_INTEGER,
        message: 'borrowed'
      }
    case 'siehe vollanzeige':
      return {
        days: Number.MAX_SAFE_INTEGER,
        message: 'unknown'
      }
    default:
      let days = getDaysDue(status)
      return {
        days,
        message: days < 0 ? `${-days} days overdue` : `${days} days left`
      }
  }
}

// extracts a year out of a string and returns it as an integer
// returns 0 if no year found or empty string
export function extractYear (str) {
  if (str === '') {
    return 0
  }
  // extract 4 digit year
  let year = str.match(/\b(19|20)\d{2}\b/gm)
  if (year && year.length) {
    return parseInt(year[0])
  } else {
    return 0
  }
}
