
const domPrinter = {
    clearResults(){
        document.querySelector("#book-container").innerHTML = ""
    },
    createSearchBar(){
        document.querySelector("#search-catalog").innerHTML = `
        <form>
            <input id="title-book" placeholder="Book Title">
            <input id="author-book" placeholder="Author name">
            <input id="isbn-num" placeholder="ISBN Number">
        </form>
        <button id="search-book-btn">Search</button>`
    },
    createAddBookBar(){
        document.querySelector("#add-new-bar").innerHTML = `
        <form>
            <input id="add-title-book" placeholder="Add a book title">
            <input id="add-author-book" placeholder="Add an author">
            <input id="add-isbn-num" placeholder="Add an ISBN number">
        </form>
        <button id="add-book-btn">Add New Book</button>`
    },
    createLoginBar(){
        document.querySelector("#login-bar").innerHTML = `
        <form>
            <input id="add-username" placeholder="Username">
            <input id="add-password" placeholder="Password">
        </form>
        <button id="login-btn">Login</button>`
    },
    printBooks(book){
        const booksHTMLString = document.querySelector("#book-container").innerHTML += `
        <article id="book-card" class="row">
        <img class="col" src="https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-13-300x300.png" alt="book">
        <div id="book-card-${book.id}" class= "col">
        <h2>${book.title}</h2>
        <h3>Author: ${book.author}</h3>
        <p>ISBN Number: ${book.ISBN}</p>
        <button id="delete-btn-${book.id}">Remove Book</button>
        <button id="edit-btn-${book.id}">Edit Book</button>
        </div>
        </article>`
        return booksHTMLString;
    },
    addNewBook(){
        const bookTitle = document.querySelector("#add-title-book").value
        const bookAuthor = document.querySelector("#add-author-book").value
        const isbnNumber = document.querySelector("#add-isbn-num").value

        const newBookObject = {
            title: bookTitle,
            author: bookAuthor,
            ISBN: isbnNumber
        }

        return newBookObject;
    },
    buildEditForm(singleBook){
        return document.querySelector(`#book-card-${singleBook.id}`).innerHTML =`<form>
        <input id="title-edit" value = "${singleBook.title}" placeholder="Book Title" autofocus />
        <input id="author-edit" value = "${singleBook.author}" placeholder="Author name" autofocus />
        <input id="isbn-edit" value = "${singleBook.ISBN}" placeholder="ISBN Number" autofocus />
        </form>
        <button id="save-btn-${singleBook.id}">Save Changes</button>`
    },
    saveEditedBookObject(bookID){
        const editedBookData = {
            id: bookID,
            title: document.querySelector("#title-edit").value,
            author: document.querySelector("#author-edit").value,
            ISBN: document.querySelector("#isbn-edit").value
          }
        return editedBookData;
    }
}

export default domPrinter