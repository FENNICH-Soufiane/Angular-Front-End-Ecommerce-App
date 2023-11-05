import { Component } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {
  products: any[] = [];
  categories: any[] = [];

  constructor(private service: ProductsService) {}

  getProducts(): void {
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        console.log(res);
      },
      (error) => {
        alert(error.message);
        // console.log(error)
      }
    );
  }

  getCategories(): void {
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(res);
    });
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
}
