import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const updateAmount = (e: SyntheticEvent) => {
        setAmount((e.target as HTMLInputElement).value);
    };

    async function helperCreateBid(e: SyntheticEvent){
        e.preventDefault();
        try {
            let response = await fetch("http://localhost:8080/bids",  {
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
            if (response.status === 200) {
                let token = response.headers.get("Authorization");
                // console.log(response);
                if (token) {
                  sessionStorage.setItem("token", token);
                }
                const bid = await response.json();
                document?.getElementById('close')?.click();
                return navigate(`/helper/${helperId}`);
              } else {
                setErrorMessage(
                  `Could not validate credentials : ERROR CODE ${response.status}`
                );
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