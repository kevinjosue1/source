import { Component, ElementRef, ViewChild } from '@angular/core';
import { AvatarComponent } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BaileysApiService } from '../../../../Services/baileys-api.service';
import { SignalrService } from '../../../../Services/signalr.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [AvatarComponent, FontAwesomeModule, CommonModule, FormsModule, MatSlideToggleModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  faEllipsis = faEllipsis;
  hubHelloMessage?: string;
  progressPercentage?: number;
  progressMessage?: string;
  processing?: boolean;
  chatMessage?: string;
  messageRequestSend?: string;
  messageRequestResponse?: string;
  messages: any[] = [];
  private recorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  audioUrl: string = '';
  recording: boolean = false;
  newMessage: string = '';
  sessionName: string = '';
  subscriberTo: number = 0;
  requestFrom: string = '';
  

  constructor(private baileysApi: BaileysApiService, private signalrService: SignalrService,private sanitizer: DomSanitizer) { }
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    const sessionID = localStorage.getItem('sessionName');
    if (sessionID) {
      this.sessionName = sessionID;
    }


    this.signalrService.connection
    .invoke('Hello')
    .catch((error: any) => {
      console.log(`SignalrDemoHub.Hello() error: ${error.toString()}`);
      alert('SignalrDemoHub.Hello() error!, see console for details.');
    });

  this.signalrService.hubHelloMessage.subscribe((hubHelloMessage: string) => {
    this.hubHelloMessage = hubHelloMessage;
  });


  this.signalrService.chatMessage.subscribe((chatmessageInfo: string) => {
    let jsonChatMessage: any;
    try {
        if (chatmessageInfo && chatmessageInfo.startsWith('{') && chatmessageInfo.endsWith('}')) {
            jsonChatMessage = JSON.parse(chatmessageInfo);
            console.log(jsonChatMessage);
          }
    } catch (error) {
    }

    if (jsonChatMessage) {  

        if (jsonChatMessage.event === "send.message") {
            // this.messages.push({
            //     type: 'send',
            //     content: jsonChatMessage.data.result.message.extendedTextMessage.text
            // });
        } else if (jsonChatMessage.event === "messages.upsert" && !jsonChatMessage.data.messages.key.fromMe) {
          const numberTo = jsonChatMessage.data.messages.key.remoteJid;
          const numero = numberTo.match(/\d+/)?.[0];

          const prompRequest = jsonChatMessage.data.messages.message.extendedTextMessage.text;

          this.chatBotRequest(numero, prompRequest);
            this.messages.push({
                type: 'response',
                content: jsonChatMessage.data.messages.message.extendedTextMessage.text
            });
        }
    }
});
}

chatBotRequest(numberTo: number, prompRequest: string) {
  this.baileysApi.chatbotAIResponse(numberTo, prompRequest).subscribe((res: any) => {
    if (res && res.data && res.data.chatResponse) {
      this.newMessage = res.data.chatResponse;
      this.sendMessage();  
    } else {
      console.error('Respuesta inválida:', res);
    }
  },
  (error: any) => {
    console.error('Error al enviar solicitud al chatbot:', error);
  });
}

sendMessage() {
  const newMessage = this.newMessage;
  this.webHook(newMessage);
}

webHook(newMessage: string) {
  this.baileysApi.sendMessage(newMessage, this.sessionName).subscribe((res: any) => {
    this.messages.push({
      type: 'send',
      content: newMessage
    });
  },
  (error: any) => {
    console.error('Error al enviar el mensaje al webhook:', error);
  });
  this.newMessage = '';
}


  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  async startRecording() {
    this.recording = true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recorder = new MediaRecorder(stream);
      this.recorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };
      this.recorder.start();
      console.log('Recording started');
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }

  stopRecording() {
    this.recording = false;
    if (this.recorder) {
      this.recorder.stop();
      this.recorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        console.log('Recording stopped and audio URL generated', this.audioUrl);
      };
    } else {
      console.warn('Recorder is null');
    }
  }
}
