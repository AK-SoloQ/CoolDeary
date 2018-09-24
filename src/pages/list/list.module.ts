
import { NgModule } from '@angular/core';
import { IonicPageModule,} from 'ionic-angular';
import { ListPage } from './list';

import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    IonicImageViewerModule,

  ],

})
export class ListPageModule {}

