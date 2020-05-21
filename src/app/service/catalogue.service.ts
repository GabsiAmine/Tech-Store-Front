import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host: string = "http://localhost:8080"
  public progressSource = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) { }

  public getResoucre(url) {
    return this.http.get(this.host + url)
  }
  public getProduct(url): Observable<Product> {
    return this.http.get<Product>(url)
  }

  public uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }
}
