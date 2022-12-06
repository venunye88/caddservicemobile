import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Customer } from 'src/app/models/customer';
// import { BaseService } from 'src/app/services/base-service';
import { environment } from 'src/environments/environment';
import { Sale } from '../models/sale';
import { BaseService } from '../shared/shared/base-service';

@Injectable({
  providedIn: 'root'
})
export class SaleService extends BaseService<Sale> {

  constructor(http:HttpClient) {super(http,"sales") }

}
