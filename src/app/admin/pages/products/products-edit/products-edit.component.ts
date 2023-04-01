import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fadeInUpStaggerEnter } from 'src/app/shared/animations/fade-effects/fade-up/fade-in-up-stagger-enter';
import { slideFade } from 'src/app/shared/animations/slide-effects/slide-up-down/slide-fade';
import { slideToggle } from 'src/app/shared/animations/slide-effects/slide-up-down/slide-toggle';
import { TitleAndBreadcrumbsService } from 'src/app/shared/ui-elements/title-and-breadcrumbs/title-and-breadcrumbs.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
  animations: [
    fadeInUpStaggerEnter,
    slideFade,
    slideToggle
  ]
})
export class ProductsEditComponent implements OnInit {

  constructor(
    private title: Title,
    private TitleAndBreadcrumbsSer: TitleAndBreadcrumbsService,
  ) {
    this.title.setTitle('Edit Product');
    this.TitleAndBreadcrumbsSer.setBreadcrumbsOptions(2, ['admin']);

  }

  ngOnInit(): void {
  }


  updateValue() { }



}
