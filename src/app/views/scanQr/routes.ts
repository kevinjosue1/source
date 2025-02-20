import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./scan-codeqr-component').then(m => m.ChatQrComponent)
    }
];