import apiManager from "./apiManager.js"
import domPrinter from "./domPrinter.js"

const eventListeners = {
    searchForBooks () {
        document.querySelector("#search-book-btn").addEventListener("click", function(){
            if(event.target.id === "search-book-btn"){
                domPrinter.clearResults()
                const bookTitle = document.querySelector("#title-book").value.toLowerCase()
                const bookAuthor = document.querySelector("#author-book").value.toLowerCase()
                const isbnNumber = document.querySelector("#isbn-num").value.toLowerCase()
                apiManager.search(bookTitle, bookAuthor, isbnNumber)
            }
        })
    },
    addBook () {
        document.querySelector("#add-book-btn").addEventListener("click", function(){
            if(event.target.id === "add-book-btn"){
                apiManager.createNewBook()
            }
        })
    },
    deleteBook () {
        document.querySelector("body").addEventListener("click", function(){
            if(event.target.id.includes("delete-btn") === true){
                domPrinter.clearResults()
                apiManager.deleteBook()
            }
        })
    },
    editBook () {
        document.querySelector("body").addEventListener("click", function(){
            if(event.target.id.includes("edit-btn") === true){
                const bookID = event.target.id.split("-")[2]
                apiManager.editNewBook(bookID)
            }
        })
    },
    saveBook () {
        document.querySelector("body").addEventListener("click", function(){
            if(event.target.id.includes("save-btn") === true){
                const bookID = event.target.id.split("-")[2]
                apiManager.saveEditedBook(bookID)
            }
        })
    },
    login () {
        document.querySelector("#login-btn").addEventListener("click", function() {
            const usernameValue = document.querySelector("#username-input").value;
            const passwordValue = document.querySelector("#password-input").value;
            console.log(usernameValue, passwordValue);
            apiManager.loginAccount(usernameValue, passwordValue)
        })
    }
}

export default eventListeners

