import { Component } from '@angular/core';
import { CartService } from '../../Core/Servises/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];
  userId = Number(localStorage.getItem('userId'));

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
    this.cartService.loadCartFromLocalStorage(); 
  }

  getTotal(): string {
    return this.cartService.getTotalPrice().toFixed(2);
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  increase(id: number) {
    this.cartService.increaseQuantity(id);
  }

  decrease(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  checkout() {
    this.cartService.checkout(this.userId);
  }

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }
}
