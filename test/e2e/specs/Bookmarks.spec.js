import utils from '../utils'
import { NEWEST, TITLE_A_Z, TITLE_Z_A } from '../../../src/renderer/utils/constants'

const books = [{
  identifier: 'AK12009789',
  title: 'Mit Goethe in Italien : Tagebuch und Briefe des Dichters aus Italien / für dt. Italienfahrer hrsg. von Julius Vogel (Buch)'
}, {
  identifier: 'AK12015560',
  title: 'Tagebuch der italienischen Reise 1786 / Johann Wolfgang von Goethe. Notizen und Briefe aus Italien / Johann Wolfgang Goethe. Mit Skizzen und Zeichn. des Autors. Hrsg. und erl. von Christoph Michel (Band)'
}, {
  identifier: 'AK12811097',
  title: 'Italien, im Schatten der Revolution : Briefe, Tagebücher und Gespräche vom 3. September 1786 bis 12. Juni 1794 / hrsg. von Karl Eibl (Band)'
}, {
  identifier: 'AK12164088',
  title: 'Goethes Vater reist in Italien / hrsg. von Erwin Koppen. (Buch)'
}]

describe('Bookmarks', function () {
  // add fake bookmarks
  before(function () {
    // initialize with four fake bookmarks
    let identifiers = books.map(b => b.identifier)
    let str = JSON.stringify(identifiers)
    utils.writeBookmarks(str)
  })
  before(utils.before)
  after(utils.after)
  // reset bookmarks
  after(function () {
    utils.writeBookmarks('[]')
  })

  this.timeout(0)
  it('renders loading indicator', function () {
    return this.app.client
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      // check loading placeholder
      .waitForExist('.sk-fading-circle')
      .element('span.placeholder')
      .getText()
      .then(text => {
        expect(text).to.equal('Fetching bookmarks')
      })
      // go back to search
      .element('a[label="Search"]')
      .click()
  })

  it('returns search results with correct bookmark status', function () {
    return this.app.client
      .element('//input')
      .click()
      .keys('goethe italien tagebuch\uE007')
      // first four elements are bookmarked
      .waitForExist('.card:nth-child(1) svg.active')
      .waitForExist('.card:nth-child(2) svg.active')
      .waitForExist('.card:nth-child(3) svg.active')
      .waitForExist('.card:nth-child(5) svg.active')
      .waitForExist('.card:nth-child(4) svg:not(.active)')
  })

  it('sorts bookmarks correctly', function () {
    return this.app.client
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      // sort by newest
      .element('option[value="' + NEWEST + '"]')
      .click()
      // check first entry
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.equal(books[2].title)
      })
      // sort by title a-z
      .element('option[value="' + TITLE_A_Z + '"]')
      .click()
      // check first entry
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.equal(books[3].title)
      })
      // sort by title z-a
      .element('option[value="' + TITLE_Z_A + '"]')
      .click()
      // check first entry
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.equal(books[1].title)
      })
  })

  it('bookmarks can be removed', function () {
    return this.app.client
      // switch to search
      .element('a[label="Search"]')
      .click()
      .waitForExist('input')
      // unbookmark first card
      .element('.card:nth-child(1) svg.active')
      .click()
      .element('.card:nth-child(3) svg.active')
      .click()
      .element('.card:nth-child(5) svg.active')
      .click()
      .waitForExist('.card:nth-child(1) svg:not(.active)')
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      // check first entry
      .element('#app > div:nth-child(2) > div > div.card.bookmarks > div > div.title')
      .getText()
      .then(text => {
        expect(text).to.equal(books[1].title)
      })
      // switch to preview
      .element('#app > div:nth-child(2) > div > div.card.bookmarks')
      .click()
      .waitForExist('div.grid')
      // unbookmark
      .element('#app > div:nth-child(2) > div > div:nth-child(1) > svg')
      .click()
      // go back to search page
      .element('#app > div:nth-child(2) > div > div:nth-child(1) > a:nth-child(1)')
      .click()
      .waitForExist('#app > .container:nth-child(2):not(.slide-right-leave-active) > span.placeholder')
      // placeholder should be displayed
      .element('.container > span.placeholder')
      .getText()
      .then(text => {
        expect(text.trim()).to.equal('You have not added any bookmarks yet.')
      })
  })

  it('bookmarks settings file gets updated', function () {
    return expect(utils.readBookmarks()).to.equal('[]')
  })
})
