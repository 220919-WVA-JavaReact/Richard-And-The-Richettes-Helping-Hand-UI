import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bid } from "../../models/bid";
import { Request } from "../../models/request";
import { Helper } from "../../models/helper";
import '../create-request/create-request.css';

interface ICreateBidProps {
    currentBid: Bid | undefined;
    setCurrentBid: (nextBid: Bid) => void;
    currentRequest: Request | undefined;
    loggedInHelper: Helper | undefined;
}


function CreateBid(props: ICreateBidProps){
    const [amount, setAmount] = useState("");
    const request = props.currentRequest;
    const helperId = props.loggedInHelper?.id;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    console.log(request, "in create bid");
    const updateAmount = (e: SyntheticEvent) => {
        setAmount((e.target as HTMLInputElement).value);
    };

    async function helperCreateBid(e: SyntheticEvent){
        e.preventDefault();
    
        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/bids`,  {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    request,
                    helperId,
                    amount
                }),
            });
            if (response.status === 201) {
                let token = response.headers.get("Authorization");
                // console.log(response);
                if (token) {
                  sessionStorage.setItem("token", token);
                }
                const bid = await response.json();
                console.log(bid, 'bid response')
                navigate(`/helper/${helperId}`);
                return ;

              } else {
                setErrorMessage(
                  `Could not validate credentials : ERROR CODE ${response.status}`
                );
                console.log("error")
              }
        } catch (err) {
            console.log("There was an error communicating with the API.");
        }
    }

    return (
        <div className='create-req-cont'>
            <p>Bid Creation</p>
            <input className="text-black" placeholder="Amount" type="amount" onChange={updateAmount} /><br/><br/>
            <label className="btn btn-secondary" onClick={helperCreateBid}>Create Bid</label>
        </div>
    );   
}

export default CreateBid;