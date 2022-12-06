import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'src/app/models/service';
import { BaseService } from '../shared/shared/base-service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService<Service> {

  constructor(http:HttpClient) {
    super(http,"services");
  }
}
