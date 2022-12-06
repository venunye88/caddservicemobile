import { NgModule } from '@angular/core';
import { SalesPageRoutingModule } from './sales-routing.module';
import { SalesPage } from './sales.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SalesPageRoutingModule
  ],
  declarations: [SalesPage]
})
export class SalesPageModule {}
