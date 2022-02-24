import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = 'https://jsonplaceholder.typicode.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpclient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpclient
      .get(this.apiURL + '/posts')
      .pipe(catchError(this.errorHandler));
  }

  create(post: Post): Observable<any> {
    return this.httpclient
      .post(this.apiURL + '/posts', JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpclient
      .get(this.apiURL + '/posts/' + id)
      .pipe(catchError(this.errorHandler));
  }
  update(id: number, post: Post): Observable<any> {
    return this.httpclient
      .put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  delete(id: number): Observable<any> {
    return this.httpclient
      .delete(this.apiURL + '/posts/' + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:any) {
    let errormessage = '';
    if (error.error instanceof ErrorEvent) {
      errormessage = error.error.message;
    } else {
      errormessage = 'Error code: ${error.status} message: ${error.message}';
    }
    return throwError(errormessage);
  }
}
