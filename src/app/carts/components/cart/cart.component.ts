import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {

  cartProducts: any[] = [];
  total: any = 0;
  success:boolean = false

  constructor(private service: CartsService) {}


  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    console.log(this.cartProducts);
    this.getCartTotal();
  }

  minsAmount(index: number) {
    if (this.cartProducts[index].quantity > 0)
      this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  plusAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal()
  }

  clearCart() {
    this.cartProducts = []
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {
    let products = this.cartProducts.map((item) => ({
      productId: item.item.id, quantity: item.quantity
    }))
    let Model = {
      userId:5,
      date: new Date(),
      products: products
    }
    this.service.createNewCart(Model).subscribe((res) => {
      this.success = true
    })
    console.log(Model);
  }
  ngOnInit() {
    this.getCartProducts();
    
  }
}
