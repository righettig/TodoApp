import * as signalR from '@microsoft/signalr';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

class SignalRService {
    private connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${apiUrl}/todoItemsHub`, { withCredentials: false })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.startConnection();
    }

    startConnection() {
        this.connection.start()
            .then(() => console.log("SignalR Connected"))
            .catch(err => console.log("Error while starting connection: " + err));
    }

    on(event: string, callback: (...args: any[]) => any) {
        this.connection.on(event, callback);
    }

    off(event: string) {
        this.connection.off(event);
    }

    send(event: string, data: any) {
        this.connection.send(event, data)
            .then(() => console.log("Data sent"))
            .catch(err => console.log("Error while sending data: " + err));
    }
}

const signalRService = new SignalRService();

export default signalRService;
