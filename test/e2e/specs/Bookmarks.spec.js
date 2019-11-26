import utils from '../utils'
import { NEWEST, TITLE_A_Z, TITLE_Z_A } from '../../../src/renderer/utils/constants'
var books = [
  {
    identifier: 'AK12009789',
    title: 'Mit Goethe in Italien : Tagebuch und Briefe des Dichters aus Italien',
    year: 1908
  },
  {
    identifier: 'AK12070211',
    title: 'Tagebücher und Briefe Goethes aus Italien an Frau von Stein und Herder',
    year: 1886
  },
  {
    identifier: 'AK12015560',
    title: 'Tagebuch der italienischen Reise 1786',
    year: 1976
  },
  {
    identifier: 'AK04245892',
    title: 'Tagebuch der italienischen Reise 1786',
    year: 1982
  },
  {
    identifier: 'AK12116312',
    title: 'Auf Goethes Spuren in Italien : Tagebuch einer Reise',
    year: 1960
  },
  {
    identifier: 'AK16296497',
    title: 'Gesamtausgabe der Werke und Schriften : in 22 Bänden - Poetische Werke. - 9. Autobiographische Schriften, zweiter Teil',
    year: 1982
  },
  {
    identifier: 'AK12811097',
    title: 'Sämtliche Werke, Briefe, Tagebücher und Gespräche. - Abt. 2: Briefe, Tagebücher und Gespräche. Sämtliche Werke, Briefe, Tagebücher und Gespräche. - Abt. 2: Briefe, Tagebücher und Gespräche.. - 3. Italien, im Schatten der Revolution : Briefe, Tagebücher und Gespräche vom 3. September 1786 bis 12. Juni 1794',
    year: 1991
  },
  {
    identifier: 'AK12531333',
    title: 'Reise-Tagebuch 1786 : (italienische Reise) ; [eine Publikation des Arbeitskreises Selbständiger Kultur-Institute e.V. - AsKI, Bonn und der Stiftung Weimarer Klassik, Weimar aus Anlass der Eröffnung der vom AsKI getragenen Casa di Goethe, Via del Corso, Rom]',
    year: 0
  },
  {
    identifier: 'AK10166794',
    title: 'Tagebuch der italienischen Reise 1786 : [Hörbuch]',
    year: 2007
  },
  {
    identifier: 'AK13851041',
    title: 'Goethes Briefe an Frau von Stein : mit dem Tagebuch aus Italien und Briefen der Frau von Stein ; in vier Bänden',
    year: 1924
  },
  {
    identifier: 'AK12164088',
    title: 'Goethes Vater reist in Italien',
    year: 1972
  },
  {
    identifier: 'AK12812835',
    title: 'Sämtliche Werke, Briefe, Tagebücher und Gespräche. - Abt. 1: Sämtliche Werke. Sämtliche Werke, Briefe, Tagebücher und Gespräche. - Abt. 1: Sämtliche Werke.. - 27. Amtliche Schriften : Teil 2: Aufgabengebiete seit der Rückkehr aus Italien',
    year: 1999
  },
  {
    identifier: 'AK16160272',
    title: 'Goethe - Kunstwerk des Lebens : Biographie',
    year: 2013
  },
  {
    identifier: 'AK06019641',
    title: 'Tagebuch aus dem Warschauer Ghetto 1942',
    year: 1992
  },
  {
    identifier: 'AK05008927',
    title: 'Italienische Reise',
    year: 1987
  },
  {
    identifier: 'AK15496769',
    title: 'Italienische Reise',
    year: 0
  },
  {
    identifier: 'AK16344973',
    title: 'Kafka geht ins Kino',
    year: 2017
  },
  {
    identifier: 'AK16090383',
    title: 'The originals : legendary recordings from the Deutsche Grammophon catalogue ; [CD]. - Volume II. The Originals - Legendary Recordings',
    year: 2016
  },
  {
    identifier: 'AK03473444',
    title: 'Goethes Werke : in 14 Bänden. - Bd. 11.. Autobiographische Schriften : Bd. 3',
    year: 2002
  },
  {
    identifier: 'AK12676845',
    title: 'Goethes Werke : in 14 Bänden. - Bd. 11.. Autobiographische Schriften : Bd. 3',
    year: 1981
  }
]

describe('Bookmarks', function () {
  // add fake bookmarks
  before(function () {
    // initialize with the first three fake bookmarks
    let identifiers = books.slice(0, 3).map(b => b.identifier)
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
      // first elements are bookmarked
      .waitForExist('.card:nth-child(1) svg.active')
      .waitForExist('.card:nth-child(2) svg.active')
      .waitForExist('.card:nth-child(3) svg.active')
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
        expect(text).to.satisfy(text => text.startsWith(books[2].title))
      })
      // sort by title a-z
      .element('option[value="' + TITLE_A_Z + '"]')
      .click()
      // check first entry
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.satisfy(text => text.startsWith(books[0].title))
      })
      // sort by title z-a
      .element('option[value="' + TITLE_Z_A + '"]')
      .click()
      // check first entry
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.satisfy(text => text.startsWith(books[1].title))
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
      .waitForExist('.card:nth-child(1) svg:not(.active)')
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      // check first entry
      .element('#app > div:nth-child(2) > div > div.card.bookmarks > div > div.title')
      .getText()
      .then(text => {
        expect(text).to.satisfy(text => text.startsWith(books[1].title))
      })
      // switch to preview
      .element('#app > div:nth-child(2) > div > div.card.bookmarks')
      .click()
      .waitForExist('div.grid')
      // unbookmark
      .element('#app > div:nth-child(2) > div > div:nth-child(1) > svg')
      .click()
      // go back to bookmarks page
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
