import { ProductsService } from './../../products/products.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { TitleAndBreadcrumbsService } from 'src/app/shared/ui-elements/title-and-breadcrumbs/title-and-breadcrumbs.service';
import { OrdersService } from '../orders.service';
import { OrderProductViewModel, OrderViewModel } from 'src/app/shared/models/orders/order.model';
import { UsersService } from 'src/app/shared/services/user.service';
import { ProductViewModel } from 'src/app/shared/models/products/product.model';
import { UserViewModel } from 'src/app/shared/models/users/user.model';

@Component({
  selector: 'app-products-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {
  orders: OrderViewModel[] = []
  products: ProductViewModel[] = []
  users: UserViewModel[] = []

  constructor(
    private title: Title,
    private TitleAndBreadcrumbsService: TitleAndBreadcrumbsService,
    private OrdersService: OrdersService,
    private ProductsService: ProductsService,
    private UsersServices: UsersService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Orders');
    this.TitleAndBreadcrumbsService.setBreadcrumbsOptions(1, ['admin']);
    this.getProdutcs()
    this.getUsers()
    this.getOrders()

  }
  getOrders() {
    this.OrdersService.get().subscribe(res => {
      if (res) {
        this.orders = res as OrderViewModel[]
      }
    })
  }

  getProdutcs() {
    this.ProductsService.get().subscribe(res => {
      if (res) {
        this.products = res as ProductViewModel[]
      }
    })
  }
  getUsers() {
    this.UsersServices.get().subscribe(res => {
      if (res) {
        this.users = res as UserViewModel[]
      }
    })
  }

  getTotalPrice(products: OrderProductViewModel[]): number {
    let totalPrice = 0;
    products.forEach(product => {
      const productPrice = this.getProductPriceById(product.ProductId);
      totalPrice += product.Quantity * productPrice;
    });
    return totalPrice;
  }

  getProductPriceById(productId: number): number {
    return this.products.find(prod => prod.ProductId == productId)?.ProductPrice
  }
  getUserNameById(userId: string): string {
    const user = this.users.find(u => u.Id === userId);
    return user ? user.Name : 'Unknown user';
  }

  // for ngFor trackBy
  track(index: number, order: OrderViewModel) {
    return order ? order.OrderId : undefined;
  }


}
