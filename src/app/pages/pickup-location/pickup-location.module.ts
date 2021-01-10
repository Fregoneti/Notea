import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PickupLocationPage } from './pickup-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupLocationPage
  ],
  declarations: [PickupLocationPage]
})
export class LoginPageModule {}
