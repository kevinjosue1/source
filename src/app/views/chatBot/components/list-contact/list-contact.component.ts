import { Component, EventEmitter, Output } from '@angular/core';
import { BaileysApiService } from 'src/app/Services/BaileysApi/baileys-api.service';
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
  constructor(private baileysApi: BaileysApiService){}

  ngOnInit(): void {
    const sessionID = localStorage.getItem('sessionName');
    if (sessionID) {
      this.sessionName = sessionID;
    }
    this.getContactList();
  }



  getContactList() {
    if (this.sessionName === '') {
        return;
    } else {
        this.baileysApi.listOfContacts(this.sessionName).subscribe((res: any) => {
            if (Array.isArray(res.data)) {
                this.contactdata = res.data.filter((item: { name: any; id: any; }) => item.name !== null);
                console.log(this.contactdata);
            } else {
                console.error("no es un array:", res.data);
            }
        });
    }
}

logId(id: string) {
  this.idEmitted.emit(id);
  console.log(id);
}}
