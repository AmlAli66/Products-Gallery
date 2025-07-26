export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface CartPayload {
    userId: number;
    date: string;
    products: {
      productId: number;
      quantity: number;
    }[];
  }
  