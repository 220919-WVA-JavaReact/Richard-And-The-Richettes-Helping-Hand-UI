import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bid } from "../../models/bid";
import { Request } from "../../models/request";
import { Client } from "../../models/client";
import { Status } from '../../models/status';

interface IUpdateStatusProps {
    currentBid: Bid | undefined;
    setCurrentBid: (nextBid: Bid) => void;
    currentRequest: Request | undefined;
    loggedInClient: Client | undefined;
}

function UpdateStatus(props: IUpdateStatusProps){
    // const [status, setStatus] = useState("");
    const id = props.currentBid?.id;
    const clientId = props.loggedInClient?.id;
    const helperId = props.currentBid?.helperId;
    const amount = props.currentBid?.amount;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const request = props.currentRequest;

    const acceptBid = (e: SyntheticEvent) => {
        e.preventDefault();
        clientUpdateStatus(Status.ACCEPTED);
    }

    const declineBid = (e: SyntheticEvent) => {
        e.preventDefault();
        clientUpdateStatus(Status.DECLINED);
    }

    async function clientUpdateStatus(status: Status){
        try{
            let bid = await fetch(`${process.env.REACT_APP_API_URL}/bids`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    helperId,
                    amount,
                    status,
                    request
                }),
            });
            console.log(bid);

            if (bid.status !== 201) {
                console.log(bid);
                console.log(bid.status);
                console.log("could not connect");
            } else {
                const result = await bid.json();
                return navigate(`/client/${clientId}`);
            }
        } catch (err) {
            console.log("There was an error communicating with the API.");
        }
    }

    return (
        <div>
            <p>Updating Bid</p>
            <div className="card w-96 bg-primary shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{props.currentRequest?.title}</h2>
                    <p>{props.currentRequest?.description}</p>
                    <p>{props.currentBid?.amount}</p>
                    <button className="btn btn-primary" onClick={acceptBid}>Accept</button>
                    <button className="btn btn-primary" onClick={declineBid}>Decline</button>
                </div>
            </div>
        </div>
    )
}
export default UpdateStatus;