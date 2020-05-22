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
        domPrinter.addNewBook.userId = sessionStorage.getItem("userId")
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
    },
    loginAccount(usernameValue, passwordValue){
        return fetch(`http://localhost:3000/users?username=${usernameValue}`)
        .then(r => {
            console.log(r.status)
            if(r.status === 400){
                return window.alert(`I'm sorry! The username you entered is not in our system. Please try again!`)
            }
            else{return r.json()}
        })
        .then(user => {
            console.log(user[0].id);
            console.log(user[0].password);
            if (passwordValue === user[0].password){
                sessionStorage.setItem("userId", user[0].id);
                fetch(`http://localhost:3000/books/?userId=${sessionStorage.getItem("userId")}`)
                    .then(r => r.json())
                    .then(parsedBooks => {
                        domPrinter.clearResults()
                        parsedBooks.forEach(book =>{
                            domPrinter.printBooks(book)
                        })
                    })
            }
            else{
                window.alert(`I'm sorry! The password you entered does not exist with the username:           ${usernameValue}
                    Please try again!`)
            }
            // TODO: handle errors if user enters username that doesn't exist
            // TODO: think about how to register new users
            
        })
    }
}

export default apiManager