import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { TitleAndBreadcrumbsService } from 'src/app/shared/ui-elements/title-and-breadcrumbs/title-and-breadcrumbs.service';
import { ProductsService } from '../products.service';
import { ProductViewModel } from 'src/app/shared/models/products/product.model';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  products: ProductViewModel[] = []
  constructor(
    private title: Title,
    private TitleAndBreadcrumbsService: TitleAndBreadcrumbsService,
    private ProductsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Products');
    this.TitleAndBreadcrumbsService.setBreadcrumbsOptions(1, ['admin']);
    this.getProducts()

  }
  // get Products data
  getProducts() {
    this.ProductsService.get().subscribe(res => {
      if (res) {
        this.products = res as ProductViewModel[]
      }
    })
  }



  // for ngFor trackBy
  track(index: number, prod: ProductViewModel) {
    return prod ? prod.ProductId : undefined;
  }


}
