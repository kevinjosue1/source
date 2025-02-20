import { Injectable } from '@angular/core';
import { environment } from '../app/environment/environment';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root',
})
export class SignalrService {
    connection: any;
    hubHelloMessage: BehaviorSubject<string>;
    progressPercentage: BehaviorSubject<number>;
    progressMessage: BehaviorSubject<string>;
    chatMessage: BehaviorSubject<string>;

    constructor() {
        this.connection = null;
        this.hubHelloMessage = new BehaviorSubject<string>("");
        this.progressPercentage = new BehaviorSubject<number>(0);
        this.progressMessage = new BehaviorSubject<string>("");
        this.chatMessage = new BehaviorSubject<string>("");
    }

    // Establish a connection to the SignalR server hub
    public initiateSignalrConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(environment.signalrHubUrl)
                .build();

            this.setSignalrClientMethods();

            this.connection
                .start()
                .then(() => {
                    console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
                    resolve();
                })
                .catch((error: any) => {
                    console.log(`SignalR connection error: ${error}`);
                    reject();
                });
        });
    }

    // This method will implement the methods defined in the ISignalrDemoHub interface in the SignalrDemo.Server .NET solution
    private setSignalrClientMethods(): void {
        this.connection.on('DisplayMessage', (message: string) => {
            this.hubHelloMessage.next(message);
        });

        this.connection.on('UpdateProgressBar', (percentage: number) => {
            this.progressPercentage.next(percentage);
        });

        this.connection.on('DisplayProgressMessage', (message: string) => {
            this.progressMessage.next(message);
            // console.log(message);
        });

        this.connection.on('Chat', (message: string) => {
            this.chatMessage.next(message);
            // console.log(message, 'Chat');
        });

    }
}
