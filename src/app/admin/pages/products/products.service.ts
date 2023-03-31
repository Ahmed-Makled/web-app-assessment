import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private ApiService: ApiService
  ) { }
  get() {
    return this.ApiService.get('../../../../assets/data/porducts.json')
  }
}
