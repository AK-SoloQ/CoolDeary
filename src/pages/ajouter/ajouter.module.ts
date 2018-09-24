import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterPage } from './ajouter';
import { IonicImageViewerModule } from 'ionic-img-viewer'

@NgModule({
  declarations: [
    AjouterPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterPage),
    IonicImageViewerModule  
    
  ],
})
export class AjouterPageModule {}
