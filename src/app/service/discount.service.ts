import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Discount } from '../model/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private discountUrl = 'http://localhost:8080/discounts'; 
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  
  /** GET discounts from the server */
  getDiscounts(): Observable<Discount[]> {
    return this.http.get(this.discountUrl)
    .pipe(
      map((data: any) => {
        return data._embedded.discountList;
      }));
  }

  /** GET discount by id. Will 404 if id not found */
  getDiscount(id: number): Observable<Discount> {
    return this.http.get<Discount>( `${this.discountUrl}/${id}`);
  }
  
  //////// Save methods //////////

  /** POST: add a new discount to the server */
  addDiscount(discount: Discount) {
    return this.http.post<Discount>(`${this.discountUrl}`, discount, {
      observe: 'response'
    });
  }

  /** DELETE: delete the discount values from the server */
  deleteDiscount(discount: Discount | number): Observable<Discount> {
    const id = typeof discount === 'number' ? discount : discount.id;
    const url = `${this.discountUrl}/${id}`;

    return this.http.delete<Discount>(url, this.httpOptions);
  }

  /** PUT: update the discount values on the server */
  updateDiscount(discount: Discount): Observable<any> {
    const url = `${this.discountUrl}/${discount.id}`;
    return this.http.put(url, 
      discount, this.httpOptions);
  }
}
