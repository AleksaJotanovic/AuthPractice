import { Injectable } from '@angular/core';
import { Book } from 'src/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getBooks() {
    const token = this.authService.getCurrentToken();
    return this.http.get(
      `https://backendlesson25-default-rtdb.firebaseio.com/books.json?auth=${token}`,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  storeBook(book: Book) {
    const token = this.authService.getCurrentToken();
    return this.http.post(
      `https://backendlesson25-default-rtdb.firebaseio.com/books.json?auth=${token}`,
      book,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }
}
