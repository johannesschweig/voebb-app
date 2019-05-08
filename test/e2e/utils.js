import electron from 'electron'
import { Application } from 'spectron'
import fs from 'fs'
import os from 'os'
import path from 'path'

// constants for settings paths
const storage = path.join(os.homedir(), '.config/Electron/storage/')
const bookmarksPath = path.join(storage, 'bookmarks.json')
const librariesPath = path.join(storage, 'libraries.json')

export default {
  after () {
    this.timeout(0)
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  },
  before () {
    this.timeout(0)
    this.app = new Application({
      path: electron,
      args: ['dist/electron/main.js'],
      startTimeout: 11000,
      waitTimeout: 11000, 
      env: {
        NODE_ENV: 'development'
      }
    })

    return this.app.start()
  },
  // write string to bookmark settings file
  writeBookmarks (str) {
    fs.writeFileSync(bookmarksPath, str)
  },
  // read bookmarks settings file
  readBookmarks() {
    return fs.readFileSync(bookmarksPath , 'utf-8')
  },
  // write string to libraries settings file
  writeLibraries (str) {
    fs.writeFileSync(librariesPath, str)
  },
  // read bookmarks settings file
  readLibraries() {
    return fs.readFileSync(librariesPath, 'utf-8')
  }
}
