import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../shared/interface/brand/brand';
import { BrandService } from '../../../core/services/brand/brand.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  bransList: Brand[] = [];
  constructor(private _brand: BrandService) {}

  ngOnInit(): void {
    this.getBrand();
  }
  getBrand() {
    this._brand.getAllBrands().subscribe({
      next: (res) => {
        this.bransList = res.data;
      },
    });
  }
}
