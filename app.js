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
        const books = Data.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const bookList = document.querySelector('#libros-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        bookList.appendChild(row);
    }

    static removeBook(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
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
        localStorage.setItem('books', JSON.stringify(books));
    }

    static deleteBook(isbn) {
        const books = Data.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

/**
 * Load page
 */
document.addEventListener('DOMContentLoad', UI.viewBooks());

/**
 * Control submit event
 */
document.querySelector('#libro-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get values of the fields
    const title = document.querySelector('#titulo').value;
    const author = document.querySelector('#autor').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.viewAlert('Por favor ingrese todos los datos', 'danger');
    } else {
        book = new Book(title, author, isbn);
        Data.addBook(book);
        UI.addBookToList(book);
        UI.viewAlert('Libro agregado a la colección', 'success');
        UI.cleanInfo();
    }
});

/**
 * Control click event
 */
document.querySelector('#libros-list').addEventListener('click', (element) => {
    UI.removeBook(element.target);
    Data.deleteBook(element.target.parentElement.previousElementSibling.textContent);
    UI.viewAlert('Libro eliminado', 'success');
});