import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bid } from "../../models/bid";
import { Request } from "../../models/request";
import { Helper } from "../../models/helper";

interface IUpdateAmountProps {
    currentBid: Bid | undefined;
    setCurrentBid: (nextBid: Bid) => void;
    currentRequest: Request | undefined;
    loggedInHelper: Helper | undefined;
}

function UpdateAmount(props: IUpdateAmountProps){
    const [amount, setAmount] = useState("");
    const id = props.currentRequest?.id;
    const helperId = props.loggedInHelper?.id;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const updateAmount = (e: SyntheticEvent) => {
        setAmount((e.target as HTMLInputElement).value);
    };

    async function helperUpdateBid(e: SyntheticEvent){
        e.preventDefault();
        try{
            let bid = await fetch("http://localhost:8080/bids", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
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
                return navigate(`/helper/${helperId}`)
            }
        } catch (err) {
            console.log("There was an error communicating with the API");
        }
    }


    return (
        <div>
            <p>Updating Bid</p>

            <input className="text-black" placeholder="Amount" type="amount" onChange={updateAmount} /><br/><br/>
            <label className="btn btn-secondary" onClick={helperUpdateBid}>Update Amount</label><br/><br/>
            
        </div>
    )
}

export default UpdateAmount;
