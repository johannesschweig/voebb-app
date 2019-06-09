import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import { remote } from 'electron'
import router from './router.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

console.log('User storage in', require('electron-json-storage').getDefaultDataPath())

// register shortcut to open dev tools
remote.globalShortcut.register('CommandOrControl+Shift+I', () => {
  remote.BrowserWindow.getFocusedWindow().webContents.openDevTools()
})
window.addEventListener('beforeunload', () => {
  remote.globalShortcut.unregisterAll()
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
