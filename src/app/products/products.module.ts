import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/AllProductsComponent';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AllProductsComponent, ProductsDetailsComponent],
  imports: [CommonModule, BrowserModule],
})
export class ProductsModule {}
