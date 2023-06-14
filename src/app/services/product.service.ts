import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProducts, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products !: Array<Product>;
  constructor() {
    this.products = [
      { id: UUID.UUID(), name: "Computer", price: 6500, promotion: true },
      { id: UUID.UUID(), name: "Printer", price: 1200, promotion: true },
      { id: UUID.UUID(), name: "Smart phone", price: 1400, promotion: false },
    ];
    for (let index = 0; index < 10; index++) {
      this.products.push({ id: UUID.UUID(), name: "Computer", price: 6500, promotion: true },
        { id: UUID.UUID(), name: "Printer", price: 1200, promotion: true },
        { id: UUID.UUID(), name: "Smart phone", price: 1400, promotion: false })
    }
  }

  public getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }



  public getPageProducts(Page: number, Size: number): Observable<PageProducts> {
    let index = Page * Size;
    let totaPage = ~~(this.products.length / Size);
    if (this.products.length % Size != 0) {
      totaPage++;
    }
    let pageProduct = this.products.slice(index, index + Size);
    return of({ page: Page, size: Size, T_Pages: totaPage, products: pageProduct })
    // return of({ products: pageProduct, page: Page, size: Size, totaPages: totaPage });
  }




  public deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }
  public setPromo(id: string): Observable<boolean> {
    let product = this.products.find(p => p.id == id)
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    } else {
      return throwError(() => new Error("Product not found"));
    }
  }

  public searchProduct(keyword: string, Page: number, Size: number): Observable<PageProducts> {
    let searchproduct = this.products.filter(p => p.name.includes(keyword));
    let index = Page * Size;
    let totaPage = ~~(searchproduct.length / Size);
    if (this.products.length % Size != 0) {
      totaPage++;
    }
    let pageProduct = searchproduct.slice(index, index + Size);
    return of({ page: Page, size: Size, T_Pages: totaPage, products: pageProduct })
  }
}

