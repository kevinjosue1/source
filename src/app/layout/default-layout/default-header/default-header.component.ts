import { ChangeDetectorRef, Component, computed, DestroyRef, inject } from '@angular/core';
import {
  ContainerComponent,
  ColorModeService,
  HeaderComponent
} from '@coreui/angular';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [ ContainerComponent]
})

export class DefaultHeaderComponent extends HeaderComponent {


  tooltipText = 'Select the role to invite the user';
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];
  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor( private router: Router,  private cdRef: ChangeDetectorRef) {
    super();
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }


  




}
