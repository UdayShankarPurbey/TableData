import { TopGainerComponent } from './pages/top-gainer/top-gainer.component';
import { Routes } from '@angular/router';
import { EquityDataMasterComponent } from './pages/equity-data-master/equity-data-master.component';
import { LayoutComponent } from './component/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

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
      },
      {
        path : 'topGainer',
        component : TopGainerComponent
      },
      {
        path : '**',
        component : PageNotFoundComponent
      }
    ]
  },  
];
