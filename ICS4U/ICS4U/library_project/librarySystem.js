// librarySystem.js
import books from './books.js';
import promptSync from 'prompt-sync';
const prompt = promptSync();

console.log(books);

// Add new book
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

// List available books
function listAvailableBooks() {
  const availableBooks = [];
  for (const book of books) {
    if (book.isAvailable) {
      availableBooks.push(book);
    }
  }

  if (availableBooks.length === 0) {
    console.log("No books are currently available.");
  } else {
    console.log("Available Books:");
    for (const book of availableBooks) {
      console.log(`- ${book.title}`);
    }
  }
}

// Borrow book
function borrowBook(title) {
  let foundBook = null;

  for (const book of books) {
    if (book.title.toLowerCase() === title.toLowerCase()) {
      foundBook = book;
      break;
    }
  }

  if (!foundBook) {
    console.log("Book not found.");
  } else if (!foundBook.isAvailable) {
    console.log(`"${foundBook.title}" is currently unavailable.`);
  } else {
    foundBook.isAvailable = false;
    console.log(`You have borrowed "${foundBook.title}".`);
  }
}

// Return book
function returnBook(title) {
  let foundBook = null;

  for (const book of books) {
    if (book.title.toLowerCase() === title.toLowerCase()) {
      foundBook = book;
      break;
    }
  }

  if (!foundBook) {
    console.log("Book not found.");
  } else {
    foundBook.isAvailable = true;
    console.log(`You have returned "${foundBook.title}".`);
  }
}

// List books by specific author
function listBooksByAuthor(author) {
  const booksByAuthor = [];

  for (const book of books) {
    if (book.author.toLowerCase() === author.toLowerCase()) {
      booksByAuthor.push(book);
    }
  }

  if (booksByAuthor.length === 0) {
    console.log(`No books found by ${author}.`);
  } else {
    console.log(`Books by ${author}:`);
    for (const book of booksByAuthor) {
      console.log(`- ${book.title}`);
    }
  }
}

// Find books published before a year
function findBooksBeforeYear(year) {
  const oldBooks = [];
  for (const book of books) {
    if (book.year < parseInt(year)) {
      oldBooks.push(book);
    }
  }

  if (oldBooks.length === 0) {
    console.log(`No books published before ${year}.`);
  } else {
    console.log(`Books published before ${year}:`);
    for (const book of oldBooks) {
      console.log(`- ${book.title} (${book.year})`);
    }
  }
}

// Remove book
function removeBook(title) {
  let index = -1;

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.toLowerCase() === title.toLowerCase()) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    console.log("Book not found.");
  } else {
    const removed = books.splice(index, 1)[0];
    console.log(`Book "${removed.title}" has been removed.`);
  }
}

// Main function
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
      "Enter number here: "
    );

    switch (choice) {
      case "1":
        const title = prompt("Enter book title: ");
        const author = prompt("Enter book author: ");
        const year = prompt("Enter year published: ");
        addBook(title, author, year);
        break;
      case "2":
        listAvailableBooks();
        break;
      case "3":
        borrowBook(prompt("Enter the title of the book to borrow: "));
        break;
      case "4":
        returnBook(prompt("Enter the title of the book to return: "));
        break;
      case "5":
        listBooksByAuthor(prompt("Enter the author's name: "));
        break;
      case "6":
        findBooksBeforeYear(prompt("Enter the year: "));
        break;
      case "7":
        removeBook(prompt("Enter the title of the book to remove: "));
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

// Start the program
startLibrarySystem();
