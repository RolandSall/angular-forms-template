import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({providedIn: 'root'})
export class ProductsService {

  constructor(private http: HttpClient) {

  }

  // tslint:disable-next-line:typedef
  getAllProducts(): Observable<Product[]>{
    const host = environment.baseUrl;
    return this.http.get<Product[]>(host + '/products');
  }

  getSelectedProduct(): Observable<Product[]>{
    const host = environment.baseUrl;
    return this.http.get<Product[]>(host + '/products?selected=true');
  }

  getAvailableProduct(): Observable<Product[]>{
    const host = environment.baseUrl;
    return this.http.get<Product[]>(host + '/products?available=true');
  }
}
