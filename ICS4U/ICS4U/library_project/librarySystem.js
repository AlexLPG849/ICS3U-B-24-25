//librarySystem.js
import books from './books.js';
//promt sync
import promptSync from 'prompt-sync';
const prompt = promptSync();
console.log(books)
//add new book
function addBook(title, author, year) {
  const newBook = {
    title,
    author,
    year: parseInt(year),
    isAvailable: true,
  };
  books.push(newBook);
  console.log(`Book "${title}" added to the library.`);
}

// list books
function listAvailableBooks() {
  const availableBooks = books.filter(book => book.isAvailable);
  if (availableBooks.length === 0) {
    console.log("No books are currently available.");
  } else {
    console.log("Available Books:");
    availableBooks.forEach(book => console.log(`- ${book.title}`));
  }
}

//borrow bok
function borrowBook(title) {
  const book = books.find(book => book.title.toLowerCase() === title.toLowerCase());
  
  if (!book) {
    console.log("Book not found.");
  } else if (!book.isAvailable) {
    console.log(`"${book.title}" is currently unavailable.`);
  } else {
    book.isAvailable = false;
    console.log(`You have borrowed "${book.title}".`);
  }
}

// return book
function returnBook(title) {
  const book = books.find(book => book.title.toLowerCase() === title.toLowerCase());
  if (!book) {
    console.log("Book not found.");
  } else {
    book.isAvailable = true;
    console.log(`You have returned "${book.title}".`);
  }
}

//specific author
function listBooksByAuthor(author) {
  const booksByAuthor = books.filter(book => book.author.toLowerCase() === author.toLowerCase());
  if (booksByAuthor.length === 0) {
    console.log(`No books found by ${author}.`);
  } else {
    console.log(`Books by ${author}:`);
    booksByAuthor.forEach(book => console.log(`- ${book.title}`));
  }
}

//find books published before a certain year
function findBooksBeforeYear(year) {
  const oldBooks = books.filter(book => book.year < parseInt(year));
  if (oldBooks.length === 0) {
    console.log(`No books published before ${year}.`);
  } else {
    console.log(`Books published before ${year}:`);
    oldBooks.forEach(book => console.log(`- ${book.title} (${book.year})`));
  }
}

// Remove book
function removeBook(title) {
  const index = books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
  if (index === -1) {
    console.log("Book not found.");
  } else {
    const removed = books.splice(index, 1)[0];
    console.log(`Book "${removed.title}" has been removed.`);
  }
}
function startLibrarySystem() {
  let exit = false;

  while (!exit) {
    const choice = prompt(
      "Library Management System\n\nChoose an option:\n" +
      "1. Add a new book\n" +
      "2. List available books\n" +
      "3. Borrow a book\n" +
      "4. Return a book\n" +
      "5. List books by author\n" +
      "6. Find books before a year\n" +
      "7. Remove a book\n" +
      "8. Exit\n" +
      "Enter number here:"
    );

    switch (choice) {
      case "1":
        const title = prompt("Enter book title:");
        const author = prompt("Enter book author:");
        const year = prompt("Enter year published:");
        addBook(title, author, year);
        break;
      case "2":
        listAvailableBooks();
        break;
      case "3":
        borrowBook(prompt("Enter the title of the book to borrow:"));
        break;
      case "4":
        returnBook(prompt("Enter the title of the book to return:"));
        break;
      case "5":
        listBooksByAuthor(prompt("Enter the author's name:"));
        break;
      case "6":
        findBooksBeforeYear(prompt("Enter the year:"));
        break;
      case "7":
        removeBook(prompt("Enter the title of the book to remove:"));
        break;
      case "8":
        exit = true;
        break;
      default:
        console.log("Invalid option. Try again.");
        break;
    }
  }
}
//startuop
startLibrarySystem();