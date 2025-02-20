import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./chat-bot.component').then(m => m.ChatBotComponent),
    data: {
      title: `ChatBot`
    }
  }
];

