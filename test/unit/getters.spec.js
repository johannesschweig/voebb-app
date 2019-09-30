import getters from '../../src/renderer/store/getters'
import { bookmarksSample } from './utils'
import { allLibraries, DONE, MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A, AVAILABLE } from '../../src/renderer/utils/constants'

describe('getters', () => {
  it('returns list with bookmarks identifiers', () => {
    const state = {
      bookmarks: {
        data: [
          { a: 0, identifier: 'foo' },
          { b: 0, identifier: 'bar' }
        ]
      }
    }

    const list = getters.bookmarksList(state)
    expect(list).toEqual(['foo', 'bar'])
  })

  it('returns if details not available', () => {
    const state = {
      bookmarks: {
        data: []
      }
    }

    // empty data
    let flag = getters.detailsAvailable(state)
    expect(flag).toEqual(false)

    // no details in data
    state.bookmarks.data = [{}]
    flag = getters.detailsAvailable(state)
    expect(flag).toEqual(false)

    // details available
    state.bookmarks.data = [{ details: {} }]
    flag = getters.detailsAvailable(state)
    expect(flag).toEqual(true)
  })

  it('returns preferred libraries', () => {
    let state = {
      libraries: ['foo']
    }

    // preferred libraries set
    let libs = getters.getPreferredLibraries(state)
    expect(libs).toEqual(state.libraries)
    // preferred libraries not set
    state.libraries = []
    libs = getters.getPreferredLibraries(state)
    expect(libs).toEqual(allLibraries)
  })

  it('returns if single or multiple results available', () => {
    let state = {
      search: {
        data: []
      }
    }
    // search data empty
    let single = getters.resultsAvailable(state)
    let multiple = getters.multipleResultsAvailable(state)
    expect(single).toEqual(false)
    expect(multiple).toEqual(false)
    // still not done with loading
    state.search.loading = { status: 'foo' }
    single = getters.resultsAvailable(state)
    multiple = getters.multipleResultsAvailable(state)
    expect(single).toEqual(false)
    expect(multiple).toEqual(false)
    // results and loading done
    state.search.data = [1]
    state.search.loading = { status: DONE }
    single = getters.resultsAvailable(state)
    multiple = getters.multipleResultsAvailable(state)
    expect(single).toEqual(true)
    expect(multiple).toEqual(false)
    // multiple results
    state.search.data = [1, 2]
    single = getters.resultsAvailable(state)
    multiple = getters.multipleResultsAvailable(state)
    expect(single).toEqual(true)
    expect(multiple).toEqual(true)
  })

  it('sorts search results correctly', () => {
    let state = {
      search: {
        sorting: MOST_RELEVANT,
        data: [
          { title: 'b', year: 1 },
          { title: 'c', year: 4 },
          { title: 'cc', year: 2 },
          { title: 'a', year: 3 }
        ]
      }
    }

    // most relevant
    let sorting = getters.getSortedSearchData(state)
    expect(sorting).toEqual(state.search.data)
    // newest
    state.search.sorting = NEWEST
    sorting = getters.getSortedSearchData(state)
    expect(sorting).toEqual([1, 3, 2, 0].map(i => state.search.data[i]))
    // title a-z
    state.search.sorting = TITLE_A_Z
    sorting = getters.getSortedSearchData(state)
    expect(sorting).toEqual([3, 0, 1, 2].map(i => state.search.data[i]))
    // title z-a
    state.search.sorting = TITLE_Z_A
    sorting = getters.getSortedSearchData(state)
    expect(sorting).toEqual([2, 1, 0, 3].map(i => state.search.data[i]))
  })

  it('returns if multiple bookmarks available', () => {
    let state = {
      bookmarks: {
        data: []
      }
    }
    // bookmarks data empty
    let multiple = getters.multipleBookmarksAvailable(state)
    expect(multiple).toEqual(false)
    // still not done with loading
    state.bookmarks.loading = { status: 'foo' }
    multiple = getters.multipleBookmarksAvailable(state)
    expect(multiple).toEqual(false)
    // bookmarks and loading done
    state.bookmarks.data = [1]
    state.bookmarks.loading = { status: DONE }
    multiple = getters.multipleBookmarksAvailable(state)
    expect(multiple).toEqual(false)
  })

  it('sorts bookmarks correctly', () => {
    let state = bookmarksSample
    state.bookmarks.sorting = AVAILABLE

    // available
    let sorted = getters.getSortedBookmarksData(state)
    let sortedSample = [2, 6, 3, 5, 4, 1, 0].map(val => bookmarksSample.bookmarks.data[val])
    expect(sorted).toEqual(sortedSample)
    // title a-z
    state.bookmarks.sorting = TITLE_A_Z
    sorted = getters.getSortedBookmarksData(state)
    sortedSample = [1, 2, 0, 5, 6, 3, 4].map(val => bookmarksSample.bookmarks.data[val])
    expect(sorted).toEqual(sortedSample)
    // title z-a
    state.bookmarks.sorting = TITLE_Z_A
    sorted = getters.getSortedBookmarksData(state)
    sortedSample = [4, 3, 6, 5, 0, 2, 1].map(val => bookmarksSample.bookmarks.data[val])
    expect(sorted).toEqual(sortedSample)
    // newest
    state.bookmarks.sorting = NEWEST
    sorted = getters.getSortedBookmarksData(state)
    sortedSample = [4, 3, 1, 6, 5, 0, 2].map(val => bookmarksSample.bookmarks.data[val])
    expect(sorted).toEqual(sortedSample)
  })

  // FIXME add unit tests for dependend getters: getSortedSearchIdentifiers, getSortedBookmarksIdentifiers
})
