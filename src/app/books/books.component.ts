import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/services/book.service';
import { Book } from 'src/types';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (books: any) => {
        let booksArray = Object.keys(books).map((key) => books[key]);
        this.books = booksArray;
      },
      error: (err) => console.log('Error while getting the books: ', err),
    });
  }

  addBook(name: string, author: string) {
    let bookToAdd: Book = {
      name: name,
      author: author,
    };

    this.bookService.storeBook(bookToAdd).subscribe({
      next: () => this.getBooks(),
      error: (err) => console.log('Error while storing the book: ', err),
    });
  }
}
