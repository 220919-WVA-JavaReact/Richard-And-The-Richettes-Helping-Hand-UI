import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bid } from "../../models/bid";
import { Request } from "../../models/request";
import { Helper } from "../../models/helper";
import { Client } from "../../models/client";


interface IUpdateRequest {
    currentRequest: Request | undefined;
    loggedInClient: Client | undefined;
    setCurrentRequest: (nextRequest: Request) => void;
}

function UpdateRequest(props: IUpdateRequest){
    const requestId = props.currentRequest?.id;
    const clientId = props.currentRequest?.clientId;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [availability, setAvailability] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const updateRequest = (e: SyntheticEvent) => {
        setTitle((e.target as HTMLInputElement).value);
        setDescription((e.target as HTMLInputElement).value);
        setDeadline((e.target as HTMLInputElement).value);
    };

    async function clientUpdateRequest(e: SyntheticEvent){
        e.preventDefault();
        try{
            let req = await fetch(`http://localhost:8080/${clientId}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId,
                    requestId,
                    title,
                    description,
                    deadline,
                    availability
                }),
            });
            console.log(req);

            if (req.status != 201) {
                console.log(req);
                console.log(req.status)
                console.log('could not connect')
            } else {
                const result = await req.json();
                return navigate(`/client/${clientId}`)
            }
        } catch (err) {
            console.log('Error communicating with backend')
        }
    }

    return (
        <div>
            <p>Updating Your Request</p>

            <input className="text-black" placeholder="Title" type="amount" onChange={updateRequest} /><br/><br/>
            <input className="text-black" placeholder="Description" type="amount" onChange={updateRequest} /><br/><br/>
            <input className="text-black" placeholder="Deadline" type="amount" onChange={updateRequest} /><br/><br/>
            <label className="btn btn-secondary" onClick={clientUpdateRequest}>Update Request</label><br/><br/>
            {/* <label for="What is your choice?">
                <select name="choice" id="selection">
                    <option value ="available">OPEN</option>
                    <option value="closed">CLOSED</option>
                </select>
            </label>  */}
        </div>
    )
}

export default UpdateRequest;