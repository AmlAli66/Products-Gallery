import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../Core/Servises/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private router: Router,private cartService: CartService) {}


addToCart(product: any) {
  this.cartService.addToCart(product);
}


}
