import { getCurrentDateString, shortenLibraryName, sanitizeDetail, getDaysDue, getAvailability, getCondensedAvailability } from '@/utils/string.js'

function getDateFromToday (days) {
  let date = new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000))
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

let statusAvail = [
  { status: 'Verfügbar', avail: { days: -Number.MAX_SAFE_INTEGER, message: 'available' } },
  { status: 'ist verfügbar', avail: { days: -Number.MAX_SAFE_INTEGER, message: 'available' } },
  { status: 'Ausgeliehen - Fällig am: ' + getDateFromToday(2), avail: { days: 2, message: '2 days left' } },
  { status: 'Ausgeliehen - Fällig am: ' + getDateFromToday(-12), avail: { days: -12, message: '12 days overdue' } },
  { status: 'Ausgeliehen Fällig am', avail: { days: -99, message: '99 days overdue' } },
  { status: 'Ausgeliehen - Fällig am: d.d.a', avail: { days: -99, message: '99 days overdue' } },
  { status: 'Nicht im Regal', avail: { days: Number.MAX_SAFE_INTEGER, message: 'lost' } },
  { status: 'Reserviert', avail: { days: Number.MAX_SAFE_INTEGER, message: 'reserved' } },
  { status: 'Ausgeliehen', avail: { days: Number.MAX_SAFE_INTEGER, message: 'borrowed' } },
  { status: 'Siehe Vollanzeige', avail: { days: Number.MAX_SAFE_INTEGER, message: 'unknown' } }
]

describe('string.js', () => {
  it('returns date string in correct format', () => {
    expect(getCurrentDateString()).toMatch(/^\d\d:\d\d$/)
  })

  it('returns date string in correct format', () => {
    expect(shortenLibraryName('test: foo (bar)')).toEqual('foo')
    expect(shortenLibraryName('foo')).toEqual('foo')
    expect(shortenLibraryName('Bibl.')).toEqual('Bibliothek')
    expect(shortenLibraryName('Ju.bibl. (foo)')).toEqual('Jugendbibliothek')
  })

  it('sanitizes details', () => {
    expect(sanitizeDetail('ISBN', '123-456-789')).toEqual('123456789')
    expect(sanitizeDetail('Titel', 'foo; bar(123')).toEqual('foo')
    expect(sanitizeDetail('Titel', 'foo( bar[123')).toEqual('foo')
    expect(sanitizeDetail('Titel', 'foo[ bar;123')).toEqual('foo')
    expect(sanitizeDetail('Titel', 'foo. bar.123')).toEqual('foo. bar.123')
    expect(sanitizeDetail('foo', 'bar')).toEqual('bar')
  })

  it('computes days due', () => {
    expect(getDaysDue('foo: ' + getDateFromToday(100))).toEqual(100)
    expect(getDaysDue('foo')).toEqual(-99)
  })

  it('returns condensed availability message', () => {
    let unsorted = [ 10, 2, -3, 0, 4 ]
    let copies = unsorted.map(e => ({ availability: { days: e } }))
    expect(getCondensedAvailability(copies)).toEqual({ days: -3 })
    expect(getCondensedAvailability([])).toEqual({ days: Number.MAX_SAFE_INTEGER, message: 'not available' })
  })

  it('transforms status in availability object', () => {
    for (let i = 0; i < statusAvail.length; i++) {
      expect(getAvailability(statusAvail[i].status)).toEqual(statusAvail[i].avail)
    }
  })
})
