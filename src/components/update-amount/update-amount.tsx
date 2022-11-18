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
    const id = props.currentBid?.id;
    const helperId = props.loggedInHelper?.id;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const status = props.currentBid?.status;

    const updateAmount = (e: SyntheticEvent) => {
        setAmount((e.target as HTMLInputElement).value);
    };

    async function helperUpdateBid(e: SyntheticEvent){
        e.preventDefault();
        try{
            let bid = await fetch(`${process.env.REACT_APP_API_URL}/bids`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    helperId,
                    amount,
                    status
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
