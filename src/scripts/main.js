import eventListeners from "./eventListeners.js"
import domPrinter from "./domPrinter.js"
import apiManager from "./apiManager.js"

apiManager.getAllBooks()

domPrinter.createLoginBar()
domPrinter.createAddBookBar()
domPrinter.createSearchBar()

eventListeners.login()
eventListeners.searchForBooks()
eventListeners.addBook()
eventListeners.deleteBook()
eventListeners.editBook()
eventListeners.saveBook()

