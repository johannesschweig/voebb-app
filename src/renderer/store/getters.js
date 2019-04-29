export default {
    // returns a list with all the bookmarks identifiers
    bookmarksList: state => {
      return state.bookmarks.data.map(obj => obj.identifier)
    },
    // returns true if details are available for the bookmaks
    detailsAvailable: state => {
        // no bookmarks at all
        if (state.bookmarks.data.length == 0) {
            return false
        // bookmarks missing details
        } else if(!state.bookmarks.data[0].details) {
            return false
        } else {
            return true
        }
    }
}
