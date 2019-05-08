import utils from '../utils'


describe('Bookmarks', function () {
    // add fake bookmarks
    before(function() {
        utils.writeBookmarks('["AK12009789", "AK12015560"]')
    })
    before(utils.before)
    after(utils.after)
    // reset bookmarks
    after(function() {
        utils.writeBookmarks('[]')
    })

  this.timeout(0)
  it('returns search results with correct bookmark status', function () {
    return this.app.client
        .element('//input')
        .click()
        .keys('goethe italien tagebuch\uE007')
        .waitForExist('table')
        .element('tr:nth-child(1) td:nth-child(3) .fas')
        .isExisting()
        .element('tr:nth-child(2) td:nth-child(3) .fas')
        .isExisting()
        .element('tr:nth-child(3) td:nth-child(3) .far')
        .isExisting()
  })

  it('bookmarks can be removed', function() {
    return this.app.client
        // remove first bookmark on search results page
        .element('tr:nth-child(1) td:nth-child(3) .fa-bookmark')
        .click()
        .element('tr:nth-child(1) td:nth-child(3) .far')
        .isExisting()
        // switch to bookmarks
        .element('//span[text() = "Bookmarks"]')
        .click()
        // check first entry
        .element('//table/tbody/tr[1]/td[1]/div[1]')
        .getText()
        .then(text => {
          expect(text).to.equal('Tagebuch der italienischen Reise 1786 / Johann Wolfgang von Goethe. Notizen und Briefe aus Italien / Johann Wolfgang Goethe. Mit Skizzen und Zeichn. des Autors. Hrsg. und erl. von Christoph Michel')
        })
        // remove it
        .element('//table/tbody/tr[1]/td[1]/div[2]/i')
        .click()
        .waitForExist('span.placeholder')
        .element('span.placeholder')
        .getText()
        .then(text => {
            expect(text.trim()).to.equal('You have not added any bookmarks yet.')
        })
  })

  it('bookmarks settings file gets updated', function() {
    return expect(utils.readBookmarks()).to.equal('[]')
  })
})