// Book Class: Reperesents a Book
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// Ui Class: Handles UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add Books
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    // Validate
    if (title === '' || author === '') {
        alert('Please fill in all fields')
    } else {
         // Instatiate
    const book = new Book(title, author);

    // Add Book to UI
    UI.addBookToList(book);

    // Add Book to Store
    Store.addBook(book);

    // Clear Fields
    UI.clearFields();
    }
});

// Event: Remove Books
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove Book from UI
    UI.deleteBook(e.target);

    // Remove Book from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});