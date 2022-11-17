import { Availability } from "./availability";

export class Request{
    id: string;
    title: string;
    description: string;
    deadline: Date;
    clientId: string;
    availability: Availability

    constructor(id: string, title: string, description: string, deadline: Date, clientId: string, availability: Availability){
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.clientId = clientId;
        this.availability = availability;
    }
}