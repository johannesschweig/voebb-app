import { getEntryDetails, search } from '@/utils/requests'
import { TOO_MANY_HITS, NO_HITS } from '@/utils/constants.js'


// checks if array of objects has an object with prop
function hasProp(arr, prop) {
    let exists = false
    arr.forEach(e => {
        if (e.hasOwnProperty(prop)) {
            exists = true
        }
    })
    return exists
}

// properties of results
const props = ['title', 'name', 'medium', 'year', 'img', 'identifier', 'avail']


describe('requests.js', () => {
  it('retrieves details data for entry', () => {
    return getEntryDetails('AK00000008')
    .then(res => {
        expect(res.hasOwnProperty('details')).toBeTruthy()
        expect(res.hasOwnProperty('identifier')).toBeTruthy()
        expect(res.hasOwnProperty('availability')).toBeTruthy()
        expect(hasProp(res.details, 'Titel')).toBeTruthy()
        expect(hasProp(res.details, 'Person')).toBeTruthy()
    })
  })

  it('returns search results for search term', () => {
    return search('goethe italienreise')
    .then(res => {
        // returns search results
        expect(res.length > 0).toBeTruthy()
        // search results have correct format
        res.forEach(e => {
            props.forEach(p => {
                expect(e.hasOwnProperty(p)).toBeTruthy()
            })
        })
    })
  })

  it('returns empty search if no results', () => {
    return search('akjalsfjasdfljkasdfjlh')
    .then(res => {
        // returns search results
        expect(res).toEqual(NO_HITS)
    })
  })

  it('returns empty search if too many results', () => {
    return search('goethe')
    .then(res => {
        // returns search results
        expect(res).toEqual(TOO_MANY_HITS)
    })
  })

  it('retrieves details even when redirected', () => {
    return search('felix felka')
    .then(res => {
        // returns search results
        expect(res.hasOwnProperty('details')).toBeTruthy()
        // details have correct format        
        props.forEach(p => {
            expect(res.details.hasOwnProperty(p)).toBeTruthy()
        })
        
    })
  })

})