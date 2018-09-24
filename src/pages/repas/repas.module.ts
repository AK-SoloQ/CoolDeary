import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepasPage } from './repas';

@NgModule({
  declarations: [
    RepasPage,
  ],
  imports: [
    IonicPageModule.forChild(RepasPage),
  ],
})
export class RepasPageModule {}
