// navigation strings
export const PAGE = 'Page'
export const SEARCH_WRAPPER = 'SearchWrapper'
export const BOOKMARKS_WRAPPER = 'BookmarksWrapper'
export const SETTINGS_PAGE = 'SettingsPage'
export const PREVIEW = 'Preview'
export const DETAILS = 'Details'
export const COPIES = 'Copies'

// states for loading data
export const INITIAL = 'initial'
export const LOADING = 'loading'
export const TOO_MANY_HITS = 'tooManyHits'
export const NO_HITS = 'noHits'
export const DONE = 'done'

export const detailsBlacklist = [
  '',
  'Anmerkungen',
  'Land',
  'Gesamtwerk',
  'Schlagwortkette',
  'Verbundsystematik',
  'Weitere Titel',
  'Nummer',
  'Inhaltsverzeichnis',
  'Sprache Original',
  'FSK/USK',
  'Physische Beschreibung',
  'Bevorzugter Titel',
  'Ausgabe',
  'Freie Schlagwörter',
  'Sammelrezension',
  'Erläuterungen',
  'URL',
  'Link zur Onleihe'
]

// contains the medium - font awesome class mappings
export const mediumIcons = [
  {
    name: 'DVD',
    icon: 'fas fa-film'
  },
  {
    name: 'CD',
    icon: 'fas fa-compact-disc'
  },
  {
    name: 'Buch',
    icon: 'fas fa-book'
  },
  {
    name: 'Band',
    icon: 'fas fa-book'
  },
  {
    name: 'E-Audio',
    icon: 'far fa-file-audio'
  },
  {
    name: 'MP3',
    icon: 'far fa-file-audio'
  },
  {
    name: 'E-Book',
    icon: 'fas fa-atlas'
  },
  {
    name: 'Video',
    icon: 'fas fa-video'
  },
  {
    name: 'E-Learning',
    icon: 'fas fa-atlas'
  },
  {
    name: 'Schallplatte',
    icon: 'fas fa-compact-disc'
  },
  {
    name: 'Noten',
    icon: 'fab fa-itunes-note'
  },
  {
    name: 'Stücktitel/Band',
    icon: 'fas fa-book'
  },
  {
    name: 'E-Ressource',
    icon: 'fas fa-atlas'
  },
  {
    name: 'Zeitschrift',
    icon: 'far fa-newspaper'
  },
  {
    name: 'konventionelles Spiel',
    icon: 'fas fa-dice'
  }
]

export const allLibraries = [
  'Charlottenburg-Wilmersdorf: Adolf-Reichwein-Bibliothek',
  'Charlottenburg-Wilmersdorf: Dietrich-Bonhoeffer-Bibliothek',
  'Charlottenburg-Wilmersdorf: Eberhard-Alexander-Burgh-Bibliothek',
  'Charlottenburg-Wilmersdorf: Heinrich-Schulz-Bibliothek mit Musikabteilung',
  'Charlottenburg-Wilmersdorf: Ingeborg-Bachmann-Bibliothek',
  'Charlottenburg-Wilmersdorf: Johanna-Moosdorf-Bibliothek',
  'Charlottenburg-Wilmersdorf: Stadtteilbibliothek Halemweg',
  'Friedrichshain - Kreuzberg: Bibliothek Adalbertstr.',
  'Friedrichshain - Kreuzberg: Bibliothek Dudenstr.',
  'Friedrichshain - Kreuzberg: Bibliothek Frankfurter Allee 14a',
  'Friedrichshain - Kreuzberg: Bibliothek Glogauerstr.',
  'Friedrichshain - Kreuzberg: Schulbibliothek Blücherstr. (nicht öffentlich)',
  'Lichtenberg: Anna - Seghers - Bibliothek',
  'Lichtenberg: Anton - Saefkow - Bibliothek',
  'Lichtenberg: Bodo - Uhse - Bibliothek',
  'Lichtenberg: Egon - Erwin - Kisch - Bibliothek',
  'Marzahn - Hellersdorf: Bibl. Kaulsdorf - Nord',
  'Marzahn - Hellersdorf: Bibl. Mahlsdorf',
  'Marzahn - Hellersdorf: Ehm Welk Bibliothek',
  'Marzahn - Hellersdorf: Heinrich von Kleist Bibliothek',
  'Marzahn - Hellersdorf: Mark Twain Bibliothek',
  'Marzahn - Hellersdorf: Musikbibliothek',
  'Mitte: Bibliothek Tiergarten Süd',
  'Mitte: Bibliothek am Luisenbad',
  'Mitte: Bruno - Lösche - Bibliothek',
  'Mitte: Fahrbibliothek 1',
  'Mitte: Fahrbibliothek 2',
  'Mitte: Fahrbibliothek 3',
  'Mitte: Hansabibliothek',
  'Mitte: Kurt - Tucholsky - Bibliothek',
  'Mitte: Philipp - Schaeffer - Bibliothek',
  'Mitte: Schiller - Bibliothek mit @hugo Jugendmedienetage',
  'Neukoelln: Bibliothek Britz Süd',
  'Neukoelln: Bibliothek Rudow',
  'Neukoelln: Bibliothek im Gemeinschaftshaus',
  'Neukoelln: Helene - Nathan - Bibliothek',
  'Neukoelln: Museum Neukölln (kein Ausgabeort)',
  'Pankow: Bettina von Arnim Bibliothek',
  'Pankow: Bibliothek Buch',
  'Pankow: Bibliothek Karow',
  'Pankow: Bibliothek am Wasserturm',
  'Pankow: Heinrich Böll Bibliothek',
  'Pankow: Janusz Korczak Bibliothek',
  'Pankow: Kurt Tucholsky Bibliothek',
  'Pankow: Museumsarchiv Pankow (kein Ausgabeort)',
  'Pankow: Wolfdietrich Schnurre Bibliothek',
  'Reinickendorf: Bibl. Frohnau',
  'Reinickendorf: Bibl. Märkisches Viertel',
  'Reinickendorf: Bibl. Reinickendorf - West',
  'Reinickendorf: Bibliothek am Schäfersee  Stadtteilbibliothek Reinickendorf - Ost',
  'Reinickendorf: Fahrbibliothek Reinickendorf',
  'Reinickendorf: Humboldt-Bibliothek',
  'Reinickendorf: Humboldtschule (nicht öffentlich)',
  'Reinickendorf: Ju.bibl. Humboldt-Bibliothek',
  'Reinickendorf: Kleiner Bücherbus',
  'Spandau: Fahrbibliothek Spandau',
  'Spandau: Hauptbibliothek Spandau',
  'Spandau: Kinder- und Jugendbibliothek Spandau',
  'Spandau: Schulbibliothek Carlo Schmidt (nicht oeffentlich)',
  'Spandau: Stadtteilbibliothek Falkenhagener Feld',
  'Spandau: Stadtteilbibliothek Haselhorst',
  'Spandau: Stadtteilbibliothek Heerstrasse',
  'Spandau: Stadtteilbibliothek Kladow',
  'Steglitz - Zehlendorf: Fahrbibliothek',
  'Steglitz - Zehlendorf: Gottfried Benn Bibliothek',
  'Steglitz - Zehlendorf: Ingeborg Drewitz Bibliothek',
  'Steglitz - Zehlendorf: Stadtteilbibliothek Lankwitz',
  'Tempelhof-Schoeneberg: Bezirkszentralbibliothek Tempelhof-Schöneberg',
  'Tempelhof-Schoeneberg: Fahrbibliothek',
  'Tempelhof-Schoeneberg: Mittelpunktbibliothek Schöneberg',
  'Tempelhof-Schoeneberg: Stadtteilbibliothek Lichtenrade',
  'Tempelhof-Schoeneberg: Stadtteilbibliothek Marienfelde',
  'Tempelhof-Schoeneberg: Thomas-Dehler-Bibliothek',
  'Treptow - Koepenick: Altglienicke Stadtteilbibliothek',
  'Treptow - Koepenick: Fahrbibliothek',
  'Treptow - Koepenick: Johannes Bobrowski Bibliothek',
  'Treptow - Koepenick: Kleiner Bus',
  'Treptow - Koepenick: Manfred-Bofinger-Bibliothek',
  'Treptow - Koepenick: Mittelpunktbibliothek Köpenick',
  'Treptow - Koepenick: Mittelpunktbibliothek Treptow',
  'Treptow - Koepenick: Stefan Heym Bibliothek',
  'ZLB: Amerika-Gedenkbibliothek (AGB)',
  'ZLB: Außenmagazin Amerika-Gedenkbibliothek',
  'ZLB: Außenmagazin Berliner Stadtbibliothek',
  'ZLB: Berlin-Sammlungen',
  'ZLB: Berliner Stadtbibliothek  (BStB)',
  'ZLB: Kinder- und Jugendbibliothek mit Lernzentrum'
]
