import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },

  { path: 'admin-dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
