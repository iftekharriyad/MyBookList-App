// Book class: Represents Book
class Book {
    constructor(bookName,author,isbn){
        this.bookName=bookName;
        this.author=author
        this.isbn=isbn
    }
}

// UI class: Handles UI tasks

class UI{
    static displayBooks(){
        const storedBooks= Store.getBooks()

        const books=storedBooks;

        books.forEach((book)=>UI.addBookToList(book))
    }
    // Add a book to UI
    static addBookToList(book){
        const list= document.querySelector('#book-list')
        const tr =document.createElement('tr')
        tr.innerHTML=`
        <td>${book.bookName}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class='btn btn-danger btn-sm delete '>x</button></td>
        `
        list.appendChild(tr)
    }
    // Clear input fields in form
    static clearFields(){
        document.querySelector('#book-name').value=''
        document.querySelector('#author').value=''
        document.querySelector('#isbn').value=''
    }
    // Book remover method
    static removeBook(e){
         if(e.classList.contains('delete')){
         e.parentElement.parentElement.remove()
         }
         UI.alert('Your book is deleted','warning')
    }
    // alert method
    static alert(massage,className){
        // Creating div and adding massage
        const div= document.createElement('div')
        div.appendChild(document.createTextNode(massage))
        div.className=`alert alert-${className}`;

        //capturing container to append div
        const container=document.querySelector('.container:nth-child(2)')
        const form= document.querySelector('#book-form')

        // append div before form in container
        container.insertBefore(div,form)

        // vanish alert after 3 seconds
        setTimeout(()=>{document.querySelector('.alert').remove()},3000)
    }
}

// Store Class: Handles storage 
class Store{
    // get book from local storage
    static getBooks(){
        let books
        if (localStorage.getItem('books')===null) {
            books=[]
        }
        else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books 
    }

    //Add book to storage
    static addBook(book){
        const books=Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    // Remove book from storage
    static removeBook(isbn){
        const books=Store.getBooks()
        books.forEach((book,index)=>{
            if (book.isbn===isbn) {
                books.splice(index,1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}


// Event Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a book

// Capturing the form
const form= document.querySelector('#book-form')
// Listening to submit event
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    //getting form values
    const bookName= document.querySelector('#book-name').value
    const author= document.querySelector('#author').value
    const isbn= document.querySelector('#isbn').value

    //validate fields
    if(bookName===''|| author==='' || isbn===''){
        UI.alert("Please fill all the fields",'danger')
    }
    else{
        const book= new Book(bookName,author,isbn)
        // Add book to book list in UI
        UI.addBookToList(book)
        Store.addBook(book)
        UI.alert("Book is added to the list",'success')
        //clearing form fields
        UI.clearFields() 
    }
    
})


// Remove a  book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    // Remove from UI
    UI.removeBook(e.target)

    // Remove from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    
})