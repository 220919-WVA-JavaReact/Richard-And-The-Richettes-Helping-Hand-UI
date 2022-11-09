export class Helper{
    helper_id: string;
    first: string;
    last: string;
    username: string;
    password: string;

    constructor(id: string, username: string, first: string, last: string, password: string){
        this.helper_id = id;
        this.username = username;
        this.first = first;
        this.last = last;
        this.password = password;
    }
}
