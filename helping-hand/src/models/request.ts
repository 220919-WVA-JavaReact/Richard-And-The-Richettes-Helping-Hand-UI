import { Status } from "./status";

export class Request{
    id: string;
    title: string;
    description: string;
    deadline: Date;
    clientId: string;

    constructor(id: string, title: string, description: string, deadline: Date, clientId: string){
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.clientId = clientId;
    }
}