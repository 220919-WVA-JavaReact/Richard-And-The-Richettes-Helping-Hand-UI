export class Client{
    clientId: string;
    first: string;
    last: string;
    username: string;
    password: string;

    constructor(id: string, username: string, first: string, last: string, password: string){
        this.clientId = id;
        this.username = username;
        this.first = first;
        this.last = last;
        this.password = password;
    }
}
