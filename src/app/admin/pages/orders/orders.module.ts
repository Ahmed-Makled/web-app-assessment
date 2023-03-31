import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },

  {
    path: 'index', component: OrdersViewComponent,
  }
];
@NgModule({
  declarations: [
    OrdersViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class OrdersModule { }
