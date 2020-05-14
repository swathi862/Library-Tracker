import domPrinter from "./domPrinter.js"

const apiManager = {
    search(titleSearchInput, authorSearchInput, isbnSearchInput) {
        return fetch(`http://localhost:3000/books`)
            .then(r => r.json())
            .then(parsedBooks => {
                parsedBooks.forEach(book =>{
                    const bookName = book.title.toLowerCase()
                    const bookAuthor = book.author.toLowerCase()
                    
                    if ((titleSearchInput !== "" && bookName.includes(titleSearchInput) === true) || (authorSearchInput !== "" && bookAuthor.includes(authorSearchInput) === true) || book.ISBN === isbnSearchInput){
                        domPrinter.printBooks(book)
                    }
                })
            })
    },
    getAllBooks(){
        return fetch(`http://localhost:3000/books`)
            .then(r => r.json())
            .then(parsedBooks => {
                parsedBooks.forEach(book =>{
                    domPrinter.printBooks(book)
                })
            })
    },
    createNewBook(){
        return fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(domPrinter.addNewBook())
        }).then(() => {
            fetch(`http://localhost:3000/books`)
            .then(r => r.json())
            .then(parsedBooks => {
                parsedBooks.forEach(book =>{
                    domPrinter.printBooks(book)
                
                })
            })
        })
    },
    deleteBook(){
        const primaryKey = event.target.id.split("-")[2];
      // Use id to make a fetch call w/ a DELETE method to the database
        return fetch(`http://localhost:3000/books/${primaryKey}`, {
            method: "DELETE",
        }).then(() => {
            fetch("http://localhost:3000/books")
                .then(r => r.json())
                .then(parsedBooks => {
                    parsedBooks.forEach(book =>{
                        domPrinter.printBooks(book)
                    })
                })
        }) 
    },
    editNewBook(id){
        // document.querySelector(`#book-card-${id}`).innerHTML = ""
        return fetch(`http://localhost:3000/books/${id}`)
            .then(r => r.json())
            .then(bookToBeEdited => {
                domPrinter.buildEditForm(bookToBeEdited)                    
            })
    },
    saveEditedBook(id){
        return fetch(`http://localhost:3000/books/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(domPrinter.saveEditedBookObject(id))
        }).then(() => {
            fetch("http://localhost:3000/books")
                .then(r => r.json())
                .then(parsedBooks => {
                    domPrinter.clearResults()
                    parsedBooks.forEach(book =>{
                        domPrinter.printBooks(book)
                    })
                })
        }) 
    }
}

export default apiManager