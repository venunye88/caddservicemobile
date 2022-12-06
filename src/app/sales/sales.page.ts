import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parallel } from 'async';
import { Observable, of } from 'rxjs';
import { findWhere } from 'underscore';
import { Sale, SaleDetail } from '../models/sale';
import { Service } from '../models/service';
import { CustomerService } from '../services/customer.service';
import { Enum, LookUpService } from '../services/lookup.service';
import { SaleService } from '../services/sale.service';
import { ServiceService } from '../services/service.service';
import { Enums } from '../shared/shared/config-keys';
import { LoaderService } from '../shared/shared/loader.service';
import { ToasterService } from '../shared/shared/toaster.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  form: FormGroup;
  saleTypes: Observable<Enum[]>;
  customers: Observable<any[]>;
  services: Observable<Service[]> = of([]);

  customer: any;
  selectedItem: any = {};
  details: any[] = [];
  editMode: boolean = false;
  editIndex: number;
  total: number = 0;
  disableAddMore: boolean;

  constructor(
    private fb: FormBuilder,
    private lookUpService: LookUpService,
    private customerService: CustomerService,
    private serviceService: ServiceService,
    private toast: ToasterService,
    private loader:LoaderService,
    private saleService:SaleService
  ) {}

  ngOnInit() {
    this.setupForm();
    this.fetchLookUps();
    // this.fetchCustomers();
  }

  async fetchSalesType() {
    this.saleTypes = await this.lookUpService.fetchEnum(Enums.SaleType);
  }

  private fetchLookUps() {
    parallel(
      [
        async (callback: Function) => {
          this.saleTypes = await this.lookUpService.fetchEnum(Enums.SaleType);
          callback(null, '');
        },
        async (callback: Function) => {
          this.services = await this.serviceService.get();
          callback(null, '');
        },
      ],
      () => {}
    );
  }

  async fetchCustomers(){
    this.customers=await this.customerService.get();
  }

  // searchCustomer(event: { component: IonicSelectableComponent; text: string }) { original
  searchCustomer(event: { component: any; text: string }) {
    let term = event.text;
    event.component.startSearch();
    // Assume that we already have some PortService that return ports
    // filtered by name from our server.
    this.customerService.searchCustomers(term).subscribe((res) => {
      event.component.items = res;
      // Get ports from a storage and stop searching.
      event.component.endSearch();
    });
  }

  typeChanged(value:string) {
    this.setupForm();
    this.form.patchValue({saleType:value})
  }

  async onServiceSelected(record: any) {
    var rec = findWhere(this.saleDetails.value, {
      serviceId: record?.service.id,
    });
    if (rec) {
      this.toast.error('Duplicate service selected');
      this.removeSaleDetails(this.saleDetails.length - 1);
      this.disableAddMore = false;
      return;
    }

    record.serviceId = record.service.id;
    record.cost = record.service.cost;
    this.disableAddMore = false;
    this.totalCost();
  }

  async onSubscriptionSelected(subscriptionId){
    if(!this.form.value.customer) return;
    let subscription = findWhere(this.form.value.customer.subscriptions,{id:subscriptionId});
    this.form.patchValue({
      total:subscription.fee,
      grandTotal:subscription.fee,
      discount:0,
      // customerId:this.form.value.customer.id
    })
  }

  totalCost() {
    let sum = this.saleDetails.value.reduce((a, b) => {
      return a + b.cost;
    }, 0);

    this.form.patchValue({
      total: sum,
      grandTotal: sum - (this.form.value.discount || 0),
      // amountPaid:sum- (this.form.value.discount || 0),
    });
  }

  get saleDetails(): FormArray {
    return this.form.get('saleDetails') as FormArray;
  }

  newSaleDetails(): FormGroup {
    return this.fb.group({
      serviceId: ['', Validators.required],
      cost: null,
      service: null,
    });
  }

  removeSaleDetails(index: number) {
    this.saleDetails.removeAt(index);
    this.totalCost();
  }

  addSaleDetails() {
    this.saleDetails.push(this.newSaleDetails());
    this.disableAddMore = true;
  }

 async save(sale: Sale) {
    let isValid = this.validate(sale);
    if (!isValid) return;

    try {
      this.loader.start('saving...');
      if(sale.saleType=='Customer'){
        delete sale.saleDetails;
      }
      var success=await this.saleService.save(sale);
      if (success) this.setupForm();
    } catch (error) { } finally { this.loader.stop(); }

  }

  validate(sale: Sale) {
    switch (sale.saleType) {
      case 'Walkin':
        if (!sale.name) {
          this.toast.error('Name field is empty');
          return false;
        }
        if (!sale.phoneNumber) {
          this.toast.error('Phone number field is empty');
          return false;
        }

        return true;

      case 'Customer':
        return true

      default:
        break;
    }
  }

  setupForm() {
    this.form = this.fb.group({
      customer:null,
      saleType: null,
      customerSubscriptionId: null,
      name: null,
      phoneNumber: null,
      total: null,
      discount: null || 0,
      grandTotal: null,
      amountPaid: null,
      saleDetails: this.fb.array([]),
    });
    this.addSaleDetails();
  }
}
