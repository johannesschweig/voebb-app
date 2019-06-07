import utils from '../utils'

// get checked status from html tag
function getChecked (html) {
  return html.indexOf('checked') !== -1
}

describe('LibrariesSettings', function () {
  // add fake bookmarks
  before(function () {
    utils.writeLibraries('["ZLB: Amerika-Gedenkbibliothek (AGB)","ZLB: Außenmagazin Amerika-Gedenkbibliothek","ZLB: Außenmagazin Berliner Stadtbibliothek","ZLB: Berliner Stadtbibliothek  (BStB)","Mitte: Bibliothek am Luisenbad"]')
  })
  before(utils.before)
  after(utils.after)
  // reset bookmarks
  after(function () {
    utils.writeLibraries('["ZLB: Amerika-Gedenkbibliothek (AGB)","ZLB: Außenmagazin Amerika-Gedenkbibliothek","ZLB: Außenmagazin Berliner Stadtbibliothek","ZLB: Berliner Stadtbibliothek  (BStB)","Mitte: Bibliothek am Luisenbad"]')
  })

  this.timeout(0)
  it('removing libraries is possible', function () {
    return this.app.client
    // switch to settings
      .element('//span[text() = "Settings"]')
      .click()
    // check saved checkbox
      .element('//input[@value = "Mitte: Bibliothek am Luisenbad"]')
      .getHTML()
      .then(html => {
        expect(getChecked(html)).to.equal(true)
      })
    // untick
      .element('//input[@value = "Mitte: Bibliothek am Luisenbad"]')
      .click()
    // check unticked checkbox
      .element('//input[@value = "Mitte: Bibliothek am Luisenbad"]')
      .getHTML()
      .then(html => {
        expect(getChecked(html)).to.equal(false)
      })
  })

  it('libraries settings file gets updated', function () {
    return expect(utils.readLibraries()).to.equal('["ZLB: Amerika-Gedenkbibliothek (AGB)","ZLB: Außenmagazin Amerika-Gedenkbibliothek","ZLB: Außenmagazin Berliner Stadtbibliothek","ZLB: Berliner Stadtbibliothek  (BStB)"]')
  })
})
