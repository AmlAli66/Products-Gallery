import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private apiUrl = 'https://fakestoreapi.com/carts';

  constructor(private http: HttpClient, private productService: ProductService) {
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.getValue()));
  }

   loadCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems.next(JSON.parse(cart));
    }
  }

  fetchCartFromAPI(userId: number) {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      this.cartItems.next(JSON.parse(localCart));
      return;
    }

    this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).subscribe(async (res) => {
      const lastCart = res[res.length - 1];
      if (!lastCart) return;

      const fullProducts = await firstValueFrom(this.productService.getAllProducts());

      const transformedItems = lastCart.products.map((p: any) => {
        const fullProduct = fullProducts.find((fp: any) => fp.id === p.productId);
        return { product: fullProduct, quantity: p.quantity };
      });

      this.cartItems.next(transformedItems);
      this.saveCartToLocalStorage();
    });
  }

  addToCart(product: any) {
    const items = this.cartItems.getValue();
    const index = items.findIndex(p => p.product.id === product.id);

    if (index !== -1) {
      items[index].quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }

    this.cartItems.next([...items]);
    this.saveCartToLocalStorage();
  }

  increaseQuantity(productId: number) {
    const items = this.cartItems.getValue().map(item => {
      if (item.product.id === productId) item.quantity++;
      return item;
    });
    this.cartItems.next(items);
    this.saveCartToLocalStorage();
  }

  decreaseQuantity(productId: number) {
    let items = this.cartItems.getValue().map(item => {
      if (item.product.id === productId && item.quantity > 1) item.quantity--;
      return item;
    });
    items = items.filter(i => i.quantity > 0);
    this.cartItems.next(items);
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: number) {
    const items = this.cartItems.getValue().filter(item => item.product.id !== productId);
    this.cartItems.next(items);
    this.saveCartToLocalStorage();
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  getTotalPrice(): number {
    return this.cartItems.getValue().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  checkout(userId: number) {
    const body = {
      userId,
      date: new Date().toISOString().split('T')[0],
      products: this.cartItems.getValue().map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    this.http.post(this.apiUrl, body).subscribe({
      next: () => {
        this.clearCart();
        alert('Order placed successfully!');
      },
      error: () => alert('Checkout failed.')
    });
  }
}
