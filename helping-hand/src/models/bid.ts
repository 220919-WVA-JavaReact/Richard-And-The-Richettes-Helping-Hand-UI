export class Bid{
    bidId: string;
    amount: number;
    status: string;
    helperId: string;
    requestId: string;

    constructor(id: string, amount: number, status: string, helperId: string, requestId: string){
        this.bidId = id;
        this.amount = amount;
        this.status = status;
        this.helperId = helperId;
        this.requestId = requestId;
    }
}