import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@coreui/angular';



@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.scss'
})
export class ListContactComponent {
  sessionName: string = '';
  nameContact: string = '';
  numberContactID: string = '';
  contactdata: any[] = [];
  @Output() idEmitted = new EventEmitter<string>();
  constructor(){}

logId(id: string) {
  this.idEmitted.emit(id);
  console.log(id);
}}
