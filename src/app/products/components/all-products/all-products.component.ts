import { Component } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {
  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts:any[] = []

  constructor(private service: ProductsService) {}

  getProducts(): void {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false;
        console.log(res);
      },
      (error) => {
        alert(error.message);
        this.loading = false;
        // console.log(error)
      }
    );
  }

  getCategories(): void {
    this.loading = true;
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;
      console.log(res);
    });
  }

  // method for listening change of category in select input
  filterCategory(event: any) {
    let value = event.target.value;
    value === 'all' ? this.getProducts() : this.getProductsCategory(value);
    console.log(value);
  }
  // method for get products by categories
  getProductsCategory(category: string) {
    this.loading = true;
    this.service.getProductsByCategory(category).subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    });
  }

  addToCart(event: any) {
    console.log(event) //event renvoie les données de la cart de l'element clické
    if("cart" in localStorage) {
      // ! signifie que la valeur ne sera pas null ou undefined
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      // on peut aussi utiliser findIndex
      const exist = this.cartProducts.find((item) => item.item.id === event.item.id);//le deuxieme item vient du ligne 15 de product.components.ts
      
      if(exist) {
        alert('product is already exist in your cart')
      }else {
        this.cartProducts.push(event)
        localStorage.setItem('cart', JSON.stringify(this.cartProducts))
      }
    }
    else {
      this.cartProducts.push(event)
      localStorage.setItem('cart', JSON.stringify(this.cartProducts))
    } 
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
}
