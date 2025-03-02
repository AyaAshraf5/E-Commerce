import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Cart } from '../../../shared/interface/cart/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  cartList: Cart[] = [];
  cartId!: string;

  constructor(private _cart: CartService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._cart.getProductToCart().subscribe({
      next: (res) => {
        console.log(res);
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cartId = res.cartId;
        this._cart.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  updateCart(productId: string, count: number) {
    this._cart.updateProductToCart(productId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this._cart.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  removeProduct(productId: string) {
    this._cart.removeProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this._cart.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  clearCart() {
    this._cart.clearProduct().subscribe({
      next: (res) => {
        this.getProduct();
      },
    });
  }
}
