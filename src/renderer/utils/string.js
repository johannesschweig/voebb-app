// returns the current date string dd.mm.yyyy hh:mm
export function getCurrentDateString() {
    let date = new Date()
    let dateString = date.getDate().toString().padStart(2, '0') + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getFullYear() + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
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
