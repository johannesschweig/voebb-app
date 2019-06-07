import utils from '../utils'

// FIXME: getProperty not supported by spectron
// get class from html tag
function getClass (html) {
  let start = html.indexOf('class') + 7
  let end = html.indexOf('"', start)
  return html.substring(start, end)
}

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
      .waitForExist('table')
      .elements('//tr')
      .then(res => {
        expect(res.value.length).to.equal(22)
      })
  })

  it('displays preview', function () {
    return this.app.client
      .element('//tr/td')
      .click()
      .waitForExist('.details')
      .element('.active-row .fetch .info .title')
      .getText()
      .then(text => {
        expect(text).to.equal('Das Sams : die große Hörspielbox (CD)')
      })
  })

  // FIXME: replace pause with wait* function
  it('bookmarking is possible', function () {
    return this.app.client
      .element('.active-row td:nth-child(3) .fa-bookmark')
      .click()
      .pause(2500)
      .element('.active-row td:nth-child(3) .fa-bookmark').getHTML()
      .then(html => {
        expect(getClass(html)).to.equal('fa-bookmark fa-lg fas')
      })
    // switch to bookmarks
      .element('//span[text() = "Bookmarks"]')
      .click()
      .element('//table/tbody/tr[1]/td[1]/div[1]')
      .getText()
      .then(text => {
        expect(text).to.equal('Das Sams : die große Hörspielbox / Paul Maar')
      })
  })

  it('bookmarks settings file gets updated', function () {
    return expect(utils.readBookmarks()).to.equal('["AK16333406"]')
  })
})
