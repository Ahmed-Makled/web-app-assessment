import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserViewModel } from '../models/users/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export abstract class UsersService {

  constructor(private ApiService: ApiService) {

  }
  get() {
    return this.ApiService.get('../../../../assets/data/users.json')
  }

}
