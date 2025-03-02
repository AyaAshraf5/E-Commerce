import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
})
export class CheckOutComponent {
  cartId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _cart: CartService
  ) {
    this.activatedRoute.params.subscribe({
      next: (res) => {
        console.log(res['id']);
        this.cartId = res['id'];
      },
    });
  }

  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  submit() {
    this._cart.checkOut(this.cartId, this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        window.location.href = res.session.url;
      },
    });
  }
}

