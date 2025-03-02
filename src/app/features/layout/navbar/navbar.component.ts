import { Component, effect, Input, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input() showLink: boolean = true;
  isLogin!: boolean;
  cartNumber!: number;
  constructor(public _authService: AuthService, private cart: CartService) {
    effect(() => {
      if (_authService.userData() !== null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
    this.cart.cartNumber.subscribe({
      next: (res) => {
        this.cartNumber = res;
      },
    });
  }

  ngOnInit(): void {
    // this._authService.userData.subscribe((res) => {
    //   if (res !== null) {
    //     this.isLogin = true;
    //   } else {
    //     this.isLogin = false;
    //   }
    // });
  }
}
