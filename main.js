//Event: Submit form event

// capturing form
let form =document.querySelector('#book-form')
// listening form submit 
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    // get form values
    let bookName=document.querySelector('#book-name').value
    let author=document.querySelector('#author').value
    let isbn=document.querySelector('#isbn').value
    //validating form values
    if(bookName===''|| author===''|| isbn===''){
        UI.alert('Please fill all the fields','danger')
    }
    else{
        // create a book
        let book= new Book(bookName,author,isbn)
        // Add book to UI
        UI.addBookToList(book)
        // Success Alert
        UI.alert('Book is added to the list','success')
        // Add book to local storage
        Store.addBook(book)
        // Clear form inputs
        UI.clearFields()
    }
    
})
//listening for remove button
let bookList=document.querySelector('#book-list')
bookList.addEventListener('click',(e)=>{
    console.log(e.target)
    if(e.target.classList.contains('delete')){
        UI.removeBook(e.target)
        UI.alert('Book is removed from the list','success')
        //Get isbn
        let isbn=e.target.parentElement.previousElementSibling.textContent
        // Pass isbn 
        Store.removeBook(isbn)
    }
   
})

//UI class: Handles UI
class UI{
    //Display books to UI
    static displayBooks(){
        //Get books from local storage
        let books=Store.getBook()
        //Loop through books
        books.forEach((book)=>UI.addBookToList(book))
    }
    // Add book to list in UI
    static addBookToList(book){
        // Creating tr
        let tr=document.createElement('tr')
        tr.innerHTML=`
        <td>${book.bookName}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class='btn btn-danger btn-sm delete'>x</button></td>
        `
        //Capturing where to add
        let bookList= document.querySelector('#book-list')
        // appending tr to book list
        bookList.appendChild(tr)
    }
    // alert method
    static alert(massage,alertClass){
        //Create alert div
        let div= document.createElement('div')
        // Add alert class to the div
        div.className=`alert alert-${alertClass}`
        // Append massage to the div
        div.appendChild(document.createTextNode(massage))
        //Capture container to add div
        let container=document.querySelector('.container:nth-child(2)')
        //Capture which element to add before
        let before=document.querySelector('#book-form')
        //Insert div
        container.insertBefore(div,before)
        // Vanish after 3 sec
        setTimeout(()=>document.querySelector('.alert').remove(),3000)

    }
    // Clears form fields
    static clearFields(){
        document.querySelector('#book-name').value=''
        document.querySelector('#author').value=''
        document.querySelector('#isbn').value=''
    }
    // Remove book from UI
    static removeBook(e){
        let tr=e.parentElement.parentElement
        tr.remove()
    }
}

//Class Store: Handles local storage
class Store{
    static getBook(){
        let books
        if(localStorage.getItem('books')===null){
            books=[]
        }
        else{
            books=JSON.parse(localStorage.getItem('books'))
            
        }
        return books
        //console.log(books)
    }
    static addBook(book){
        //get books from local storage
        let books= Store.getBook()
        //console.log(books)
        //push book to books
        books.push(book)
        //update local storage
        localStorage.setItem('books',JSON.stringify(books))
    }
    //Remove Book from storage
    static removeBook(isbn){
        let books=Store.getBook()
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1)
                localStorage.setItem('books',JSON.stringify(books))
            }
        })
    }
}
// Event: load books to UI from local storage
document.addEventListener('DOMContentLoaded',UI.displayBooks)
//Class Book: Represents a book
class Book{
    constructor(bookName,author,isbn){
        this.bookName=bookName
        this.author=author
        this.isbn=isbn
    }
}
