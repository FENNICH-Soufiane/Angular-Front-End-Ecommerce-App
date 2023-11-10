import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/products/service/products.service';

@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.scss'],
})
export class CartAdminComponent {
  carts: any[] = [];
  products: any[] = [];
  total = 0;
  form!: FormGroup;
  details:any
  

  constructor(private service: CartsService,private productService: ProductsService, private build: FormBuilder) {
    
  }

  getAllCarts() {
    this.service.getAllCarts().subscribe((res: any) => {
      this.carts = res;
      console.log(this.carts);
    });
  }

  applyFilter() {
    let params = this.form.value
    this.service.getAllCarts(params).subscribe((res: any) => {
      this.carts = res;
    });
    console.log(this.form.value) // log the start and the end date
  }

  deleteCart(id:number) {
    this.service.DeleteCartById(id).subscribe((res) => {
      this.getAllCarts()
      alert("Cart deleted Successfully")
    })
  }

  // view details of specific cart
  view(index: number) {
    this.products = []
    this.details = this.carts[index]
    for (let x in this.details.products) {
      this.productService.getProductById(this?.details?.products[x]?.productId).subscribe((res) => {
        this.products.push({item: res, quantity: this?.details?.products[x].quantity})
        // this.total += this?.details?.products[x].quantity * this.products    
        console.log(res);
      })
    } 
    console.log(this.products)
  }

  ngOnInit() {
    this.form = this.build.group({
      start: [''],
      end: [''],
    });
    this.getAllCarts();
  }
}
