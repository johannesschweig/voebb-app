# BACKLOG
* add application icon
* enable auto-updating
* add unit tests (jest)
* add e2e tests (nighwatch)
* add linting

# TODO
* create search filters
    - year (minimum)
    - ISBN
    - person
    - medium
    - genre: bestseller
    - language: german/english
* create live filter
    - medium
    - available only
    - only e-resources/no e-resouces
* create settings page
    - allowed languages
* remove electron warnings
* make it easier to tick libraries (by districts)
* change application name
* fix 403 forbidden and 404 errors for retrieving images
* resort preview headers (title > person > summary > pages/language/isbn/year ...)
* searchresults: active preview should be highlighted
* prevent click on searchresult icon to trigger preview
* delete previous preview/search/bookmarks when triggering new update
* MediumIcons for
    - E-Learning
    - Mehrteiliges Werk
    - Schallplatte
    - Noten
* split settings-libraries into a view component ("Your preferred libraries are:...") and a edit component: checkboxes
* details preview blacklist
    - Link zur Onleihe
* include all results pages, not just the first
* remove libraries from previews in the case of e resources
* last updated label: constantly updating time diff ("2 minutes ago")
* sanitize details
    - remove tab character
* put all reused strings in constants file
* investigate long load times
* remove duplicate medium references in title searchresults
* create loading feedback for BookmarksIcon

# DONE
* create bookmarks page
* create preview section on the right
* create settings page
    - preferred libraries
* last updated changes
    - label should be more human readable
    - button should be smaller with icon (refresh)
    - place at the bottom of the bookmarks and make more subtle
* details preview: remove dashes and whitespace from isbn
* search field: width 300px
* create loading feedback for search, bookmarks and preview
* search results: differentiate between no results and too many results