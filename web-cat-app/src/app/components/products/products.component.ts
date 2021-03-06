import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/product.state';
import {Router} from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$?: Observable<AppDataState<Product[]>> | null = null;
  // @ts-ignore
  dataStateEnum = DataStateEnum;


  constructor(private productService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {

  }

  onGetAllProducts(): void {
    this.products$ = this.productService.getAllProducts().pipe(
      // tslint:disable-next-line:no-unused-expression
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onGetSelectedProducts(): void {
    this.products$ = this.productService.getSelectedProduct().pipe(
      // tslint:disable-next-line:no-unused-expression
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onGetAvailableProducts(): void {
    this.products$ = this.productService.getAvailableProduct().pipe(
      // tslint:disable-next-line:no-unused-expression
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSearch(dataForm: any): void {
    console.log(dataForm);
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      // tslint:disable-next-line:no-unused-expression
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSelect(product: Product): void {
    this.productService.select(product)
      .subscribe(data => {
        product.selected = data.selected;
      });
  }

  onDelete(product: Product): void {
    const verify = confirm('Are You Sure You Want To Proceed');
    if (verify) {
      this.productService.deleteProduct(product)
        .subscribe(data => {
          this.onGetAllProducts();
        });
    }
  }

  onNewProduct(): void{
    // @ts-ignore
    this.router.navigateByUrl('/newProduct');
  }
}
