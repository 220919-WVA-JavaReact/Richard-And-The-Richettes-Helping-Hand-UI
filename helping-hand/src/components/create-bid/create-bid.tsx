import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { Bid } from "../../models/bid";
import { Request } from "../../models/request";
import { Helper } from "../../models/helper";

interface ICreateBidProps {
    currentBid: Bid | undefined;
    setCurrentBid: (nextBid: Bid) => void;
    currentRequest: Request | undefined;
    loggedInHelper: Helper | undefined;
}

function CreateBid(props: ICreateBidProps){
    const [amount, setAmount] = useState("");
    const requestId = props.currentRequest?.requestId;
    const helperId = props.loggedInHelper?.helperId;

    const updateAmount = (e: SyntheticEvent) => {
        setAmount((e.target as HTMLInputElement).value);
    };

    async function helperCreateBid(e: SyntheticEvent){
        e.preventDefault();
        try {
            let bid = await fetch("http://localhost:8080/bids",  {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestId,
                    helperId,
                    amount
                }),
            });
            console.log(bid);

            if (bid.status !== 201) {
                console.log(bid);
                console.log(bid.status);
                console.log("could not connect");
            } else {
                const result = await bid.json();
                return <Navigate to="/helper/id" />;
            }
        } catch (err) {
            console.log("There was an error communicating with the API.");
        }
    }

    return (
        <div>
            <p>Bid Creation</p>

            <input className="text-black" placeholder="Amount" type="amount" onChange={updateAmount} /><br/><br/>
            <label className="btn btn-secondary" onClick={helperCreateBid}>Create Bid</label>
        </div>
    );   
}

export default CreateBid;