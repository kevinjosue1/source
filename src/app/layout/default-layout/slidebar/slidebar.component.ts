import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faL } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.scss'
})
export class SlidebarComponent {


  constructor( private router: Router ) {
  }

}
