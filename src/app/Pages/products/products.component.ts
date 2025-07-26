import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Core/Servises/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../../Shared/product-card/product-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  error = '';
  searchTerm: string = '';
  sortOption: string = '';


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
        console.log(data);
        
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  filteredAndSortedProducts() {
    let filtered = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  
    switch (this.sortOption) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      default:
        return filtered;
    }
  }
  
}
