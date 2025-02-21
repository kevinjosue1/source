import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaileysApiService {

BASE_URL = 'http://localhost:3000';
API_KEY = 'a6bc226axxxxxxxxxxxxxx';

  constructor(private http: HttpClient, private router: Router) { }   

sessionAdd(sessionName: any): Observable<any> {
  const headers = {
    'x-api-key': this.API_KEY,
    'Content-Type': 'application/json' 
  };
  return this.http.post<any>(`${this.BASE_URL}/sessions/add`, sessionName, { headers });
}  


sendMessage(message: string, sessionName: string): Observable<any> {
 
  const body = {
    "jid": "593990815777@g.us",
    "type": "number",
    "message": {
        "text": message
    }
}

  const headers = {
    'x-api-key': this.API_KEY,
    'Content-Type': 'application/json' 
  };
  return this.http.post<any>(`${this.BASE_URL}/${sessionName}/messages/send`, body, { headers });
}

deletedSession(sessionName: string): Observable<any> {
  const headers = {
    'x-api-key': this.API_KEY,
    'Content-Type': 'application/json' 
  };
  return this.http.delete<any>(`${this.BASE_URL}/sessions/${sessionName}`, { headers });
}


listOfContacts(sessionName: string): Observable<any> {
  const headers = {
    'x-api-key': this.API_KEY,
    'Content-Type': 'application/json' 
  };
  return this.http.get<any>(`${this.BASE_URL}/${sessionName}/contacts`, { headers });
}

getSessions(): Observable<any> {
  const headers = {
    'x-api-key': this.API_KEY,
    'Content-Type': 'application/json' 
  };
  return this.http.get<any>(`${this.BASE_URL}/sessions`, { headers });
}

chatbotAIResponse(suscriberTo: number, promptRequest: string): Observable<any> {
return this.http.get<any>(`https://192.168.100.5/ai/Chat?CampaignId=1&SubscriberFrom=593990897441&SubscriberTo=${suscriberTo}&PromtRequest=${promptRequest}`);
}


}
