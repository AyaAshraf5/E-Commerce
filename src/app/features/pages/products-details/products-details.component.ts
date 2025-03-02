import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-products-details',
  imports: [],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss',
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  productDetails!: Products;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _toastr: ToastrService
  ) {
    this.activatedRoute.params.subscribe((res) => {
      console.log(res['id']);
      this.id = res['id'];
    });
  }

  ngOnInit(): void {
    this.getSepesificProducts();
  }
  getSepesificProducts() {
    this._productsService.getSepecificProduct(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.productDetails = res.data;
      },
    });
  }

  addProduct(productId: string) {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success(res.message, 'success', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
    });
  }
}
