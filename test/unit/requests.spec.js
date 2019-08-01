import { getEntryDetails, search } from '@/utils/requests'

// properties of results
const props = ['title', 'name', 'medium', 'year', 'img', 'identifier']

describe('requests.js', () => {
  it('retrieves details data for entry', () => {
    let res = getEntryDetails('AK34211530', true)

    expect(res.hasOwnProperty('details')).toBeTruthy()
    expect(res.hasOwnProperty('identifier')).toBeTruthy()
    expect(res.hasOwnProperty('copies')).toBeTruthy()
    expect(res.details['Titel']).toBeTruthy()
    expect(res.details['Verfasser']).toBeTruthy()
  })

  it('returns search results for search term', () => {
    let res = search('SearchResultsPageRegular', true)

    // returns search results
    expect(res.length > 0).toBeTruthy()
    // search results have correct format
    res.forEach(e => {
      props.forEach(p => {
        expect(e.hasOwnProperty(p)).toBeTruthy()
      })
    })
  })

  it('returns empty search if no results', () => {
    let res = search('SearchResultsPageNoResults', true)

    // returns search results
    expect(res).toEqual([])
  })

  it('returns empty search if too many results', () => {
    let res = search('SearchResultsPageTooManyHits', true)

    // returns search results
    expect(res).toEqual([])
  })
})
