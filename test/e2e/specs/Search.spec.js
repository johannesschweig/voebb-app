import utils from '../utils'
import { MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A } from '../../../src/renderer/utils/constants'

describe('Search', function () {
  before(function () {
    // reset bookmarks
    utils.writeBookmarks('[]')
  })
  before(utils.before)
  after(utils.after)
  after(function () {
    // reset bookmarks
    utils.writeBookmarks('[]')
  })

  this.timeout(0)
  it('returns search results', function () {
    return this.app.client
      .element('//input')
      .click()
      .keys('sams taschenbier\uE007')
      // check loading placeholder
      .waitForExist('.sk-fading-circle')
      .element('span.placeholder')
      .getText()
      .then(text => {
        expect(text).to.equal('Searching for sams taschenbier')
      })
      // check results
      .waitForExist('.card')
      .elements('.card')
      .then(res => {
        expect(res.value).to.have.lengthOf.within(95, 105)
      })
  })

  it('sorts entries correctly', function () {
    return this.app.client
      // relevance sort
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.equal('Ein Sams für Martin Taschenbier (Band)')
      })
      .element('.card:nth-child(18) .title')
      .getText()
      .then(text => {
        expect(text).to.equal('Neue Punkte für das Sams (Buch)')
      })
      // sort by newest
      .element('option[value="' + NEWEST + '"]')
      .click()
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.equal('Ein Taucheranzug für das Sams (Band)')
      })
      // sort by title a-z
      .element('option[value="' + TITLE_A_Z + '"]')
      .click()
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.equal('Am Samstag kam das Sams zurück (E-Book)')
      })
      // sort by title z-a
      .element('option[value="' + TITLE_Z_A + '"]')
      .click()
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.equal("Sem' subbot na nedele (Buch)")
      })
      // reset sorting
      .element('option[value="' + MOST_RELEVANT + '"]')
      .click()
  })

  it('displays preview', function () {
    return this.app.client
      // click third card
      .element('.card:nth-child(3)')
      .click()
      // check transition
      .waitForExist('#app > div.slide-left-leave-active:nth-child(2)')
      .waitForExist('#app > div.slide-left-enter-active:nth-child(3)')
      // wait for preview
      .waitForExist('a[href="#/SearchWrapper/Page"]')
      .element('h1')
      .getText()
      .then(text => {
        expect(text).to.equal('Ein Sams für Martin Taschenbier / Paul Maar')
      })
      // go back to search
      .element('a[label="Search"]')
      .click()
      // check transition
      .waitForExist('#app > div.slide-right-leave-active:nth-child(2)')
      .waitForExist('#app > div.slide-right-enter-active:nth-child(3)')
      // TODO check scrolling
  })

  it('bookmarking is possible', function () {
    return this.app.client
      // click bookmark
      // FIXME remove pause
      .pause(1000)
      .element('#app > div.root > div.container > div:nth-child(3) > svg')
      .click()
      .waitForExist('#app > div.root > div.container > div:nth-child(3) > svg.active')
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      .element('.title')
      .getText()
      .then(text => {
        expect(text).to.equal('Ein Sams für Martin Taschenbier / Paul Maar (Band)')
      })
  })

  it('bookmarks settings file gets updated', function () {
    return expect(utils.readBookmarks()).to.equal('["AK15099763"]')
  })
})
