import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilPage } from './profil';

import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    ProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilPage),
    IonicImageViewerModule,
  ],
})
export class ProfilPageModule {}
