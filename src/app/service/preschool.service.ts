import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { observable, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Preschool } from '../model/preschool'

@Injectable({
  providedIn: 'root'
})
export class PreschoolService {

  private preschoolUrl = 'http://localhost:8080/preschools'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET preschools from the server */
  getPreschools(): Observable<Preschool[]> {
    return this.http.get(this.preschoolUrl)
    .pipe(
      map((data: any) => {
        return data._embedded.preschools;
      }),
    tap(_ => this.log('fetched preschools')),
    catchError(this.handleError<Preschool[]>('getPreschools', []))
    );
  }

    /** GET preschool by id. Return `undefined` when id not found */
    getPreschoolNo404<Data>(id: number): Observable<Preschool> {
      const url = `${this.preschoolUrl}/?id=${id}`;
      return this.http.get<Preschool[]>(url)
        .pipe(
          map(preschools => preschools[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} preschool id=${id}`);
          }),
          catchError(this.handleError<Preschool>(`getPreschool id=${id}`))
        );
    }

    /** GET preschool by id. Will 404 if id not found */
  getPreschool(id: number): Observable<Preschool> {
    const url = `${this.preschoolUrl}/${id}`;
    return this.http.get<Preschool>(url).pipe(
      tap(_ => this.log(`fetched preschool id=${id}`)),
      catchError(this.handleError<Preschool>(`getPreschool id=${id}`))
    );
  }

    //////// Save methods //////////

  /** POST: add a new preschool to the server */
  addPreschool(preschool: Preschool) {
    return this.http.post<Preschool>(`${this.preschoolUrl}`, preschool, {
      observe: 'response'
    });
  }

  /** DELETE: delete the preschool from the server */
  deletePreschool(preschool: Preschool | number): Observable<Preschool> {
    const id = typeof preschool === 'number' ? preschool : preschool.id;
    const url = `${this.preschoolUrl}/${id}`;

    return this.http.delete<Preschool>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted preschool id=${id}`)),
      catchError(this.handleError<Preschool>('deletePreschool'))
    );
  }

  /** PUT: update the preschool on the server */
  updatePreschool(preschool: Preschool): Observable<any> {
    const url = `${this.preschoolUrl}/${preschool.id}`;
    return this.http.put(url, 
      preschool, this.httpOptions).pipe(
      tap(_ => this.log(`updated preschool id=${preschool.id}`)),
      catchError(this.handleError<any>('updatePreschool'))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PreschoolService message with the MessageService 
   * TODO delete this method
  */
  private log(message: string) {
    //this.messageService.add(`PreschoolService: ${message}`);
  }
}
