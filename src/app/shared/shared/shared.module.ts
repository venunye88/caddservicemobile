import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
// import { ShareDirectiveModule } from '../directives/share-directive.module';
// import { SharedPipeModule } from '../pipes/shared-pipe.module';
// import { IonicSelectableModule } from 'ionic-selectable';
// import { FAIconsModule } from './faicons/faicons.module';

@NgModule({
  declarations: [
    // OTPComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    // SharedPipeModule,
    // FAIconsModule,
    IonicSelectableModule,
    // NgOtpInputModule,
    // ShareDirectiveModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    // FAIconsModule,
    // SharedPipeModule,
    IonicSelectableModule,
    // ShareDirectiveModule
    // NgOtpInputModule
  ]
})
export class SharedModule {
}
