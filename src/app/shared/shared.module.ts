import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuToggleButtonDirective } from './directives/menu-toggle-button.directive';
import { TitleAndBreadcrumbsComponent } from './ui-elements/title-and-breadcrumbs/title-and-breadcrumbs.component';
import { SimplePaginationComponent } from './ui-elements/simple-pagination/simple-pagination.component';



// shared components
const sharedComponents = [
  HeaderComponent,

];
// ui elements components
const uiElementsComponents = [
  TitleAndBreadcrumbsComponent,
  SimplePaginationComponent

];

// custom directives
const customDirectives = [

  MenuToggleButtonDirective,


];

// shared modules
const sharedModules = [
  FormsModule,
  ReactiveFormsModule,
  RouterModule

];

@NgModule({
  declarations: [
    ...sharedComponents,
    ...customDirectives,
    ...uiElementsComponents

  ],
  imports: [
    CommonModule,
    ...sharedModules
  ],
  exports: [
    ...sharedComponents,
    ...customDirectives,
    ...uiElementsComponents,
    ...sharedModules

  ]
})
export class SharedModule { }
