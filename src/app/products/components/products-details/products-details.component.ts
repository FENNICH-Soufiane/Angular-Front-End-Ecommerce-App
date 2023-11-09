import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent {
  id_: any;
  data: any = {};
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id_ = this.route.snapshot.paramMap.get('id');
    console.log(this.id_);
  }

  getProduct() {
    this.loading = true;
    this.service.getProductById(this.id_).subscribe(
      (res) => {
        this.data = res;
        this.loading = false;
        // console.log(res)
      },
      (error) => {
        this.loading = false;
        alert(error);
      }
    );
  }

  ngOnInit() {
    this.getProduct();
  }
}
