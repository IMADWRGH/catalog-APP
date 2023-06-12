import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products !: Array<Product>;
  constructor() {
    this.products = [
      { id: 1, name: "Computer", price: 6500 },
      { id: 2, name: "Printer", price: 1200 },
      { id: 3, name: "Smart phone", price: 1400 },
    ];
  }
  public getAllProducts(): Observable<Product[]> {
    let randomNumbre = Math.random();
    if (randomNumbre < 0.5) {
      return throwError(() => {
        new Error("Error");
      })
    }
    else {
      return of(this.products);
    }
  }
  public deleteProduct(id: number) {
    this.products.filter(p => p.id != id);
  }
}
