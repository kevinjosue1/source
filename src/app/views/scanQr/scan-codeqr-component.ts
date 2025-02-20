import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@coreui/angular';
import  { BaileysApiService } from '../../Services/baileys-api.service'
@Component({
  selector: 'app-qr-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './scan-codeqr-component.html',
  styleUrl: './scan-codeqr-component.scss'
})
export class ChatQrComponent {
  sessionName: string = "";
  message: string = "";
  codeQr: string = "";
constructor(private baileysApi: BaileysApiService) { }

ngOnInit(){
  const sessionID = localStorage.getItem('sessionName');
  if (sessionID) {
    this.sessionName = sessionID;
  }
}

newSessionAdd(){
  localStorage.setItem('sessionName', this.sessionName)
  const data = {
    sessionId: this.sessionName
  }

  this.baileysApi.sessionAdd(data).subscribe((Response) => {
    this.codeQr = Response.qr
  })
}


deletedSession(){
  this.baileysApi.deletedSession(this.sessionName).subscribe((Response) => {
    this.message = Response.message
    this.codeQr = ""
    console.log(this.message)
  })
  localStorage.removeItem('sessionName')
  this.sessionName  = ""
}

}
