import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { DiscountValues } from '../model/discountValues';

@Injectable({
  providedIn: 'root'
})
export class DiscountValuesService {

  private discountValuesUrl = 'http://localhost:8080/values'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

   /** GET discount values from the server */
   getDiscountValues(): Observable<DiscountValues[]> {
    return this.http.get(this.discountValuesUrl)
    .pipe(
      map((data: any) => {
        return data._embedded.discountValuesList;
      }),
    tap(_ => this.log('fetched values')),
    catchError(this.handleError<DiscountValues[]>('getDiscountValues', []))
    );
  }

   /** GET discount values by id. Will 404 if id not found */
   getDiscountValue(id: number): Observable<DiscountValues> {
    return this.http.get<DiscountValues>( `${this.discountValuesUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched value id=${id}`)),
      catchError(this.handleError<DiscountValues>(`getDiscountValue id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new discount values to the server */
   addDiscountValues(discountValues: DiscountValues, discountId: number) {
      return this.http.post<DiscountValues>(`http://localhost:8080/discounts/${discountId}/values`,
       discountValues, {
        observe: 'response'
      });
  }

  /** DELETE: delete the discount values from the server */
  deleteDiscountValues(discountValues: DiscountValues | number): Observable<DiscountValues> {
    const id = typeof discountValues === 'number' ? discountValues : discountValues.id;
    const url = `${this.discountValuesUrl}/${id}`;

    return this.http.delete<DiscountValues>(url, this.httpOptions);
  }

  /** PUT: update the discount values on the server */
  updateDiscountValues(discountValues: DiscountValues): Observable<any> {
    const url = `${this.discountValuesUrl}/${discountValues.id}`;
    return this.http.put(url, 
      discountValues, this.httpOptions);
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
