import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';

import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SignalrService } from './Services/signalr.service';

export const appConfig: ApplicationConfig = {
  providers: [
    SignalrService, {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: SignalrService) => () => signalrService.initiateSignalrConnection(),
      deps: [SignalrService],
      multi: true,
    },
    importProvidersFrom(SidebarModule),
    provideRouter(routes,withRouterConfig({onSameUrlNavigation: 'reload'}),withInMemoryScrolling({scrollPositionRestoration: 'top',anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),withViewTransitions(),withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),IconSetService,provideAnimations()
    ,provideHttpClient(), provideAnimationsAsync()
  ]
};
