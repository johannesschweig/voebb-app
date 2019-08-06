# BACKLOG
* Sorting in search: Year/Recency (Ascending/Descending), Title, Relevance (default)
* Sorting in bookmarks: Year/Recency (Ascending/Descending), Title, Availability (default)
* Show cover in preview
* include all results pages, not just the first
* While searching if requesting new search provide more feedback
* Remove search results if deleting all in the searchfield
* timeout handling is shitty (a lot of bookmarks require long timeout, search requires short one)
* New label for books < 0 days -> "3 days overdue"
* crawl image from detail/result page
  - weird jpeg format parsed with js

# TODO
## Details
* Sanitize: remove ¬ out of "Weitere Ausgabe" (AK34099010)
* resort preview headers (title > person > summary > pages/language/isbn/year ...)
* sanitize details
  - remove tab character
  - remove ... at the end of value (title)
## Copies
* Sorting copies after availability
* Show place if signature is empty (AK34099010)
* Available in: Shorten to "Available in X other libraries"; add collapser to show
## Search
* create nice icons for too many hits, no hits or error
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
* MediumIcons for
  - Mehrteiliges Werk (empty) https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=SAK15876158
  - Medienkombination (empty)
* remove duplicate medium references in title
* create loading feedback for BookmarksIcon
## Bookmarks
* display bookmarks individually as soon as they are loaded
* last updated label: constantly updating time diff ("2 minutes ago")
## Settings
* create settings page
  - allowed languages
* make it easier to tick libraries (by districts)
* split settings-libraries into a view component ("Your preferred libraries are:...") and a edit component: checkboxes
## Application
* add application icon
  - weird electron-builder problems
* enable auto-updating
  - is possible via snap
* remove electron warnings
* change application name
* put all reused strings in constants file
* investigate long load times
* add mocks for e2e tests
* improve e2e tests
  - Search: yields x results
  - Search: returns empty
  - Search: show preview, view tab1, tab2
  - Bookmarks
    o Add: from Search result
    o Add: from Preview
    o Remove: from Search result
    o Remove: from Search Preview
    o Remove: from Bookmars Preview
## Rest

# DROPPED
* fix 403 forbidden and 404 errors for retrieving images
  - Apparantly not fixable https://stackoverflow.com/questions/7035466/check-if-file-exists-but-prevent-404-error-in-console-from-showing-up
* searchresults: active preview should be highlighted
  - obsolete

# DONE
* bookmarks should not be added twice
* remove libraries from previews in the case of e resources (https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=SAK34118922)
* MediumIcons for
  - E-Learning
  - Schallplatte
  - Noten
  - Stücktitel/Band
  - E-Ressource
  - Zeitschrift
  - Konventionelles Spiel
* details preview blacklist
  - Link zur Onleihe
* multiline heading in bookmarks view ugly
  - Option 1: ellipsis with white-space: nowrap etc.
  - (Option 2: Logic to shorten text (-author))
* add unit tests (jest)
* add e2e tests (nighwatch)
* add linting
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

# INFO
* session terminated >9 min, <20min