import { Component } from '@angular/core';
import { CartService } from '../../Core/Servises/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../Core/Interfaces/types';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [];
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
