import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Core/Servises/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: any;
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  isLoading = true;
  error = '';
  Math = Math;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (res) => {this.product = res

          this.isLoading = false;
        },
        error: (err) =>{ console.error(err)
          this.error = 'Failed to load products ';
          this.isLoading = false;
        }
      });
    }
  }
}
