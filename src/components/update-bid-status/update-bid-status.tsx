import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bid } from "../../models/bid";
import { Request } from "../../models/request";
import { Client } from "../../models/client";

interface IUpdateStatusProps {
    currentBid: Bid | undefined;
    setCurrentBid: (nextBid: Bid) => void;
    currentRequest: Request | undefined;
    loggedInClient: Client | undefined;
}

function UpdateStatus(props: IUpdateStatusProps){
    const [status, setStatus] = useState("");
    const id = props.currentRequest?.id;
    const clientId = props.loggedInClient?.id;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    

    const updateStatus = (e: SyntheticEvent) => {
        setStatus((e.target as HTMLInputElement).value);
    };

    async function clientUpdateStatus(e: SyntheticEvent){
        e.preventDefault();
        try{
            let bid = await fetch(`${process.env.REACT_APP_API_URL}/bids`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    clientId,
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
                return navigate(`/client/${clientId}`);
            }
        } catch (err) {
            console.log("There was an error communicating with the API.");
        }
    }

    return (
        <div>
            <p>Updating Bid</p>

            <input className="text-black" placeholder="Status" type="status" onChange={updateStatus} /><br/><br/>
            <label className="btn btn-secondary" onClick={clientUpdateStatus}>Update Status</label>
        
        </div>
    )
}
export default UpdateStatus;