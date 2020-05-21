import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import { Product } from '../model/Product.model';
import { ItemProduct } from '../model/ItemProduct.model';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  currentCaddyName: string = "Caddy1";
  public caddies: Map<string, Caddy> = new Map();

  constructor() {
    let caddies = localStorage.getItem('mycaddies');
    if (caddies) {
      this.caddies = JSON.parse(caddies);
    } else {
      let caddy = new Caddy(this.currentCaddyName);
      this.caddies[this.currentCaddyName] = caddy;
    }
  }

  public addProductToCaddy(product: Product): void {
    let caddy = this.caddies[this.currentCaddyName];
    let productItem: ItemProduct = caddy.items[product.id];
    if (productItem) {
      productItem.quantity += product.quantity;
    } else {
      productItem = new ItemProduct();
      productItem.price = product.currentprice;
      productItem.quantity = product.quantity;
      productItem.product = product;
      caddy.items[product.id] = productItem;



      this.saveCaddy();
    }
  }

  public getCurrentCaddy(): Caddy {
    let caddy = this.caddies[this.currentCaddyName];
    return caddy;
  }

  public getTotal(): number {
    let total = 0;
    let items: IterableIterator<ItemProduct> = this.getCurrentCaddy().items.values();
    for (let pi of items) {
      total += pi.price * pi.quantity;
    }
    return total;
  }
  public saveCaddy() {
    localStorage.setItem('mycaddies', JSON.stringify(this.caddies));
  }

  getSize() {
    let caddy = this.caddies[this.currentCaddyName];
    return Object.keys(caddy.items).length;
  }

  public getCaddy(): Caddy {
    let caddy = this.caddies[this.currentCaddyName];
    return caddy;
  }

}
