import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  createNewCart(model:any) {
    return this.http.post(environment.baseApi + 'carts', model)
  }

  // function for backoffice
  getAllCarts(param?:any) {
    let params = new HttpParams()
    params = params.append("startDate", param?.start).append("endDate", param?.end)
    return this.http.get(environment.baseApi + 'carts', {params: params})
  }

  DeleteCartById(id:number) {
    return this.http.delete(environment.baseApi + "carts/" + id)
  }
}
