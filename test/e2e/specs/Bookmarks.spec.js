import utils from '../utils'

describe('Bookmarks', function () {
  // add fake bookmarks
  before(function () {
    // initialize with two fake bookmarks
    utils.writeBookmarks('["AK12009789", "AK12015560"]')
  })
  before(utils.before)
  after(utils.after)
  // reset bookmarks
  after(function () {
    utils.writeBookmarks('[]')
  })

  this.timeout(0)
  it('returns search results with correct bookmark status', function () {
    return this.app.client
      .element('//input')
      .click()
      .keys('goethe italien tagebuch\uE007')
      // first element is bookmarked
      .waitForExist('.card:nth-child(1) svg.active')
  })

  it('bookmarks can be removed', function () {
    return this.app.client
      // unbookmark first card
      .element('.card:nth-child(1) svg.active')
      .click()
      .waitForExist('.card:nth-child(1) svg:not(.active)')
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      // check first entry
      .waitForExist('#app > div:nth-child(2) > h1')
      .element('#app > div:nth-child(2) > div > div.card.bookmarks > div > div.title')
      .getText()
      .then(text => {
        expect(text).to.equal('Tagebuch der italienischen Reise 1786 / Johann Wolfgang von Goethe. Notizen und Briefe aus Italien / Johann Wolfgang Goethe. Mit Skizzen und Zeichn. des Autors. Hrsg. und erl. von Christoph Michel (Band)')
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
