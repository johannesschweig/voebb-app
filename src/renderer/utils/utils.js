// returns a loading obj with component, status and message
export function getLoadingObject (component, status = '', msg = '', progress = 0) {
  return {
    component: component,
    data: {
      status,
      msg,
      progress
    }
  }
}

// creates a custom error to catch
export function CustomError (msg) {
  this.message = msg
}
