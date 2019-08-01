import { getCurrentDateString, shortenLibraryName, sanitizeDetail, getDaysDue, getAvailability } from '@/utils/string.js'

const pref = ['foo']

function getDateFromToday (days) {
  let date = new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000))
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

const values = [
  {
    avail: [
      {
        status: 'verfügbar',
        library: 'foo'
      }
    ],
    expected: {
      days: 0,
      message: 'available'
    }
  },
  {
    avail: [
      {
        status: 'Nicht im Regal',
        library: 'foo'
      },
      {
        status: 'Ausgeliehen',
        library: 'foo'
      },
      {
        status: 'verfügbar',
        library: 'bar'
      }
    ],
    expected: {
      days: Number.MAX_SAFE_INTEGER,
      message: 'not available'
    }
  },
  {
    avail: [
      {
        status: 'Ausgeliehen - Fällig am: ' + getDateFromToday(4),
        library: 'foo'
      }
    ],
    expected: {
      days: 4,
      message: '4 days left'
    }
  },
  {
    avail: [
      {
        status: 'Ausgeliehen  Fällig am ',
        library: 'foo'
      }
    ],
    expected: {
      days: -99,
      message: '99 days overdue'
    }
  },
  {
    avail: [
      {
        status: 'Ausgeliehen - Fällig am: ' + getDateFromToday(12),
        library: 'foo'
      },
      {
        status: 'Ausgeliehen - Fällig am: ' + getDateFromToday(30),
        library: 'foo'
      }
    ],
    expected: {
      days: 12,
      message: '12 days left'
    }

  },
  {
    avail: [
      {
        status: 'Ausgeliehen - Fällig am: ' + getDateFromToday(7) + ' - bar',
        library: 'foo'
      }
    ],
    expected: {
      days: 7,
      message: '7 days left'
    }
  },
  {
    avail: [
      {
        status: 'Ausgeliehen - Fällig am: d.d.a',
        library: 'foo'
      }
    ],
    expected: {
      days: -99,
      message: '99 days overdue'
    }
  }
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

  it('returns correct availability message', () => {
    for (let i = 0; i < values.length; i++) {
      expect(getAvailability(values[i].avail, pref)).toEqual(values[i].expected)
    }
  })
})
