import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
// import { LoginComponent } from './features/auth/login/login.component';
// import { RegisterComponent } from './features/auth/register/register.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
// import { HomeComponent } from './features/pages/home/home.component';
// import { BrandsComponent } from './features/pages/brands/brands.component';
// import { CartComponent } from './features/pages/cart/cart.component';
// import { CategoresComponent } from './features/pages/categores/categores.component';
// import { NotFoundComponent } from './features/pages/not-found/not-found.component';
// import { ProductsComponent } from './features/pages/products/products.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';
import { ProductsDetailsComponent } from './features/pages/products-details/products-details.component';
import { CheckOutComponent } from './features/pages/check-out/check-out.component';
import { ProductsService } from './core/services/products/products.service';
// import { ProductsDetailsComponent } from './features/pages/products-details/products-details.component';
// import { AllOrdersComponent } from './features/pages/all-orders/all-orders.component';
// import { CheckOutComponent } from './features/pages/check-out/check-out.component';
// import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [checkTokenGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      // { path: 'login', component: LoginComponent, title: 'login' },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      // { path: 'signup', component: RegisterComponent, title: 'signup' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: 'home', component: HomeComponent, title: 'home' },
      {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      // { path: 'brands', component: BrandsComponent, title: 'brands' },
      {
        path: 'brands',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
      },
      // {
      //   path: 'cart',
      //   component: CartComponent,
      //   canActivate: [authGuard],
      //   title: 'cart',
      // },
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/cart/cart.component').then(
            (c) => c.CartComponent
          ),
      },
      // {
      //   path: 'categories',
      //   component: CategoresComponent,
      //   title: 'categories',
      // },
      {
        path: 'categories',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/categores/categores.component').then(
            (c) => c.CategoresComponent
          ),
      },
      // { path: 'products', component: ProductsComponent, title: 'products' },
      {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      // {
      //   path: 'resetPassword',
      //   component: ResetPasswordComponent,
      //   title: 'Forget Password',
      // },
      {
        path: 'resetPassword',
        canActivate: [authGuard],
        loadComponent: () =>
          import(
            './features/auth/reset-password/reset-password.component'
          ).then((c) => c.ResetPasswordComponent),
      },
      // {
      //   path: 'productDetails/:id',
      //   component: ProductsDetailsComponent,
      //   title: 'productDetails',
      // },
      {
        path: 'productDetails/:id',
        canActivate: [authGuard],
        resolve: {
          params: ProductsService,
        },
        loadComponent: () =>
          import(
            './features/pages/products-details/products-details.component'
          ).then((c) => c.ProductsDetailsComponent),
      },
      // {
      //   path: 'allorders',
      //   component: AllOrdersComponent,
      //   canActivate: [authGuard],
      //   title: 'allorders',
      // },
      {
        path: 'allorders',

        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/all-orders/all-orders.component').then(
            (c) => c.AllOrdersComponent
          ),
      },
      // {
      //   path: 'checkout/:id',
      //   component: CheckOutComponent,
      //   canActivate: [authGuard],
      //   title: 'checkout',
      // },
      {
        path: 'checkout/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/check-out/check-out.component').then(
            (c) => c.CheckOutComponent
          ),
      },
      // { path: 'notfound', component: NotFoundComponent, title: 'notfound' },
      {
        path: 'notfound',
        loadComponent: () =>
          import('./features/pages/not-found/not-found.component').then(
            (c) => c.NotFoundComponent
          ),
      },
    ],
  },
];


// "server": "src/main.server.ts",
//             "outputMode": "server",
//             "ssr": {
//               "entry": "src/server.ts"
//             }
