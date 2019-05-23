// returns the current date string dd.mm.yyyy hh:mm
export function getCurrentDateString() {
    let date = new Date()
    let dateString =  date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
    return dateString
}

// returns a shorter version of the library name
export function shortenLibraryName(library) {
    let lib = library
    let colon = lib.indexOf(':')
    if (colon != -1) {
        lib = lib.substring(colon + 2)
    }
    let bracket = lib.indexOf('(')
    if (bracket != -1) {
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
export function sanitizeDetail(key, value) {
    switch(key) {
        // remove dashes from isbn
        case 'ISBN': return value.replace(/-/g, '')
        default: return value
    }
}
