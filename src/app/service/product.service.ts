import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/Product.model';
import { Observable, fromEventPattern, throwError } from 'rxjs';
import { catchError } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public host: string = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  public getResoucre(url) {
    return this.http.get(this.host + url)
  }

  public AddProductService(product: Product): Observable<Product> {
    console.log(product);

    return this.http.post<Product>(this.host + "/addproduct", product);
  }

  handleError(error: HttpErrorResponse) {

    //throwError instead of Observable.throw
    return throwError(error.error.message || "Server Error");
  };

}
