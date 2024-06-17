import { Routes } from '@angular/router';
import { EquityDataMasterComponent } from './pages/equity-data-master/equity-data-master.component';
import { LayoutComponent } from './component/layout/layout.component';

export const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    children : [
      {
        path : 'equityMaster',
        component : EquityDataMasterComponent
      }
    ]
  },  
];
