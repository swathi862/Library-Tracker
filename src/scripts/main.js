import eventListeners from "./eventListeners.js"
import domPrinter from "./domPrinter.js"

domPrinter.createAddBookBar()
domPrinter.createSearchBar()

eventListeners.searchForBooks()
eventListeners.addBook()
eventListeners.deleteBook()

