export class Client{
    id: string;
    first: string;
    last: string;
    username: string;
    password: string;

    constructor(id: string, username: string, first: string, last: string, password: string){
        this.id = id;
        this.username = username;
        this.first = first;
        this.last = last;
        this.password = password;
    }
}
