import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {


  productFormGroup = new FormGroup({});
  submitted = false;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    });
  }

  onSave(): void {
    this.submitted = true;
    console.log(this.productFormGroup.controls.name.errors);
    if (this.productFormGroup?.invalid) {
      return;
    }
    this.productService.addProduct(this.productFormGroup.value)
      .subscribe(data => {
        alert('Success');
      });

  }
}
