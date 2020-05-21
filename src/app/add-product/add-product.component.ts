import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/Product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product: Product;
  public isChecked: boolean;
  constructor(public productService: ProductService) { }

  ngOnInit() {

  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  onAddProduct(dataform: any) {
    dataform.promotion = this.isChecked;
    this.productService.AddProductService(dataform)
      .subscribe(data => {
        alert("User created successfully.");
      });
  }

}
