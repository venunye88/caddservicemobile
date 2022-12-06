import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Customer } from 'src/app/models/customer';
// import { BaseService } from 'src/app/services/base-service';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { BaseService } from '../shared/shared/base-service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer> {

  constructor(http:HttpClient) {super(http,"customers") }

  searchCustomers(term: string) {
    if (!term) term = ""
    return this.http.get<Customer[]>(`${environment.baseApi}/${this.model}/search?term=${term}`)
  }
}
