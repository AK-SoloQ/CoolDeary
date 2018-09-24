import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverlistPage } from './popoverlist';

@NgModule({
  declarations: [
    PopoverlistPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverlistPage),
  ],
})
export class PopoverlistPageModule {}
