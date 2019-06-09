import utils from '../utils'

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
      .waitForExist('.card')
      .elements('.card')
      .then(res => {
        expect(res.value.length).to.equal(22)
      })
  })

  it('displays preview', function () {
    return this.app.client
      // click first card
      .element('.card:nth-child(1)')
      .click()
      // wait for preview
      .waitForExist('.container > .grid')
      .element('h1')
      .getText()
      .then(text => {
        expect(text).to.equal('Das Sams : die große Hörspielbox')
      })
  })

  // FIXME: replace pause with wait* function
  it('bookmarking is possible', function () {
    return this.app.client
      // click bookmark
      .element('.container > .grid > div > svg')
      .click()
      .waitForExist('.container > .grid > div > svg.active')
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      .element('.title')
      .getText()
      .then(text => {
        expect(text).to.equal('Das Sams : die große Hörspielbox / Paul Maar (CD)')
      })
  })

  it('bookmarks settings file gets updated', function () {
    return expect(utils.readBookmarks()).to.equal('["AK16333406"]')
  })
})
