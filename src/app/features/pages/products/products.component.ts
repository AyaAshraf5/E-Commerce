import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [FilterPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  searchVValue: string = '';

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _toastr: ToastrService
  ) {}

  producList: Products[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productsService.getProdycts().subscribe({
      next: (res) => {
        this.producList = res.data;
        console.log(res);
      },
    });
  }

  addProduct(productId: string) {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._cartService.cartNumber.next(res.numOfCartItems);
        this._toastr.success(res.message, 'success', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
        });
      },
    });
  }
}
