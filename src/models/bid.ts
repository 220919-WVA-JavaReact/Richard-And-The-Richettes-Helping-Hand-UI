import { Request } from './request';

export class Bid{
    id: string;
    amount: number;
    status: string;
    helperId: string;
    request: Request;

    constructor(id: string, amount: number, status: string, helperId: string, request: Request){
        this.id = id;
        this.amount = amount;
        this.status = status;
        this.helperId = helperId;
        this.request = request;
    }
}