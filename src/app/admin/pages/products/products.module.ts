import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsViewComponent } from './products-view/products-view.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },

  {
    path: 'index', component: ProductsViewComponent,
  }
];
@NgModule({
  declarations: [
    ProductsViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductsModule { }
