import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from '@coreui/angular';
import { ChatComponent } from './components/chat/chat.component';
import { ChatQrComponent } from '../scanQr/scan-codeqr-component';
import { ListContactComponent } from "./components/list-contact/list-contact.component";
@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CardModule, ChatComponent, ChatQrComponent, CommonModule, FormsModule, ListContactComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {

  constructor() { }
  handleIdEmitted(id: string) {
    
    console.log('ID recibido del hijo:', id);
  }


}
