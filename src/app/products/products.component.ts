import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products !: Array<Product>;
  errorMsg !: string;

  constructor(private productService: ProductService) {

  }
  ngOnInit(): void {
    this.handleGetAllProduct();
  }
  handleGetAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        // console.log(data);
      },
      error: (err) => {
        this.errorMsg = err;
        // console.log(err);
      }
    });
  }



  handleDeleteProducts(product: Product) {
    let conf = confirm("Are you sure");
    if (conf == false) return;
    this.productService.deleteProduct(product.id).subscribe({
      next: (data) => {
        let index = this.products.indexOf(product);
        this.products.splice(index, 1);
      },
      error: (err) => {
        throwError
      }

    })
  }

}
