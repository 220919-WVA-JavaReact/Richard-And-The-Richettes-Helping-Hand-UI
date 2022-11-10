export class Request{
    requestId: string;
    title: string;
    description: string;
    deadline: Date;
    clientId: string;

    constructor(requestId: string, title: string, description: string, deadline: Date, clientId: string){
        this.requestId = requestId;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.clientId = clientId;
    }
}