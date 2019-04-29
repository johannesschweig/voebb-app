// returns the current date string dd.mm.yyyy hh:mm
export function getCurrentDateString() {
    let date = new Date()
    let dateString = date.getDate().toString().padStart(2, '0') + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getFullYear() + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
    return dateString
}
