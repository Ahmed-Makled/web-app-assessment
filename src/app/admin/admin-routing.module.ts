import { ProductsViewComponent } from './pages/products/products-view/products-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },

      { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
      { path: 'orders', loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule) },

    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
