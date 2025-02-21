import {  Component, computed, DestroyRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ContainerComponent,
  ColorModeService,
  HeaderComponent,
  NavbarModule ,
  NavModule,
  NavLinkDirective,
  SidebarNavComponent
} from '@coreui/angular';
import { CollapseModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [ ContainerComponent, RouterModule, NavbarModule, NavModule, NavLinkDirective, SidebarNavComponent, CollapseModule, IconModule]
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

  constructor() {
    super();
  }


  




}
