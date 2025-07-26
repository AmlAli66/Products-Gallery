import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  getItems() {
    return this.cartItems.getValue();
  }

  addToCart(product: any) {
    const current = this.cartItems.getValue();
    this.cartItems.next([...current, product]);
  }

  removeFromCart(productId: number) {
    const updated = this.getItems().filter(p => p.id !== productId);
    this.cartItems.next(updated);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getTotalPrice() {
    return this.getItems().reduce((total, item) => total + item.price, 0);
  }
}
