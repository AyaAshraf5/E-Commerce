import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../shared/interface/category/category';

@Component({
  selector: 'app-categores',
  imports: [],
  templateUrl: './categores.component.html',
  styleUrl: './categores.component.scss',
})
export class CategoresComponent implements OnInit {
  categoriesList: Category[] = [];
  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this._category.getAllCategory().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
    });
  }
}
