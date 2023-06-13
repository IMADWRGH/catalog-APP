import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products !: Array<Product>;
  errorMsg !: string;
  searchFormGroup !: FormGroup;
  constructor(private productService: ProductService, private formbuild: FormBuilder) {

  }
  ngOnInit(): void {
    this.handleGetAllProduct();
    this.searchFormGroup = this.formbuild.group({
      keyword: this.formbuild.control(null)
    });

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

  handleSetPromo(product: Product) {
    let promo = product.promotion;
    this.productService.setPromo(product.id).subscribe({
      next: (data) => {
        product.promotion = !promo;
      },
      error: (err) => {
        this.errorMsg = err;
      }
    })
  }

  handleSearchProduct() {
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword).subscribe({
      next: (data) => {
        this.products = data;
      }
    })
  }
}
