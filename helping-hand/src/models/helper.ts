export class Helper{
    helperId: string;
    first: string;
    last: string;
    username: string;
    password: string;

    constructor(id: string, username: string, first: string, last: string, password: string){
        this.helperId = id;
        this.username = username;
        this.first = first;
        this.last = last;
        this.password = password;
    }
}
