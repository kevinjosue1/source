import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./list-contact.component').then(m => m.ListContactComponent)
    }
];