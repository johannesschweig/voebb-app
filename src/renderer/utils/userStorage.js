const storage = require('electron-json-storage')

// gets user data from storage
export const getUserData = (key) => {
  return new Promise((resolve, reject) => {
    storage.get(key, (error, data) => {
      if (error) {
        console.log('Error while reading user file', key, error)
        reject(error)
      }
      resolve(data)
    })
  })
}

export function setUserData (key, data) {
  storage.set(key, data, error => {
    if (error) throw error
  })
}
