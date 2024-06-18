import { Routes } from '@angular/router';
import { EquityDataMasterComponent } from './pages/equity-data-master/equity-data-master.component';
import { LayoutComponent } from './component/layout/layout.component';

export const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    children : [
      {
        path : '',
        redirectTo : 'equityMaster',
        pathMatch : 'full'
      },
      {
        path : 'equityMaster',
        component : EquityDataMasterComponent
      }
    ]
  },  
];
