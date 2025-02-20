import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ChatBot',
    pathMatch: 'full',
  },  
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'ChatBot',
        loadChildren: () => import('./views/chatBot/routes').then((m) => m.routes),

      },
      {
        path: 'listContact',
        loadChildren: () => import('./views/chatBot/components/list-contact/routes').then((m) => m.routes),
      }

    ],
  },

  { path: '**', redirectTo: 'ChatBot', pathMatch: 'full' }
  ];