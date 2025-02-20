import { Component } from '@angular/core';
import {   RouterOutlet } from '@angular/router';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { CommonModule } from '@angular/common';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { ContainerComponent} from '@coreui/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'default-layout.component.html',
  styleUrls: ['default-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DefaultHeaderComponent,
    ContainerComponent,
    RouterOutlet,
    SlidebarComponent
]
})

export class DefaultLayoutComponent  {



}
