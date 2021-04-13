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

  searchProducts(keyword: string): Observable<Product[]>{
    const host = environment.baseUrl;
    return this.http.get<Product[]>(host + '/products?name_like=' + keyword);
  }

  select(product: Product): Observable<Product>{
    const host = environment.baseUrl;
    product.selected = !product.selected;
    return this.http.put<Product>(host + '/products/' + product.id, product);
  }

  deleteProduct(product: Product): Observable<void>{
    const host = environment.baseUrl;
    return this.http.delete<void>(host + '/products/' + product.id);
  }

  addProduct(product: Product): Observable<Product>{
    const host = environment.baseUrl;
    return this.http.post<Product>(host + '/products/', product);
  }
}
