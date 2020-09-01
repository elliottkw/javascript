/**
 * Class definitions
 */

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static viewBooks() {

    }

    static addBookToList() {

    }

    static removeBook() {

    }

    static viewAlert(message, type) {
        const div = document.createElement('div');
        div.className = `alert alert-${type}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert ').remove(), 3000);
    }

    static cleanInfo() {
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbn').value = '';
    }
}

class Data {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Data.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook() {

    }
}

/**
 * Control submit event
 */
document.querySelector('#libro-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values of the fields
    const title = document.querySelector('#titulo').value;
    const author = document.querySelector('#autor').value;
    const isbn = document.querySelector('#isbn').value;

    console.log(document.querySelector('titulo'));

    if (title === '' || author === '' || isbn === '') {
        UI.viewAlert('Por favor ingrese todos los datos', 'danger');
    } else {
        book = new Book(title, author, isbn);
        Data.addBook(book);
        UI.cleanInfo();
    }
});