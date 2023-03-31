import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private ApiService: ApiService
  ) { }
  get() {
    return this.ApiService.get('../../../../assets/data/orders.json')
  }
}
