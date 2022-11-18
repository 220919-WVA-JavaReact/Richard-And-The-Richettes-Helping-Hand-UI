import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bid } from "../../models/bid";
import { Request } from "../../models/request";
import { Helper } from "../../models/helper";
import { Client } from "../../models/client";
import './create-request.css';


interface IUpdateRequest {
    currentRequest: Request | undefined;
    loggedInClient: Client | undefined;
    setCurrentRequest: (nextRequest: Request) => void;
}

function UpdateRequest(props: IUpdateRequest){
    const id = props.currentRequest?.id;
    const clientId = props.currentRequest?.clientId;
    // const id = clientId;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const availability = props.currentRequest?.availability;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [errorTitle, setErrorTitle] = useState(" ");
    const [errorDescription, setErrorDescription] = useState(" ");
    const [errorDeadline, setErrorDead] = useState(" ");
    const updateRequest = (e: SyntheticEvent) => {
        setTitle((e.target as HTMLInputElement).value);
        setDescription((e.target as HTMLInputElement).value);
        setDeadline((e.target as HTMLInputElement).value);
    };

    const updateTitle = (e: SyntheticEvent) => {
        setTitle((e.target as HTMLInputElement).value);
    };
    const updateDescription = (e: SyntheticEvent) => {
        setDescription((e.target as HTMLInputElement).value);
    };
    const updateDeadline = (e: SyntheticEvent) => {
        setDeadline((e.target as HTMLInputElement).value);
    };

    async function clientUpdateRequest(e: SyntheticEvent){
        e.preventDefault();
        if(!title){
            setErrorTitle('Must have a Title!');
        }
        if(!description){
            setErrorDescription('Must have a Description!');
        }
        if(!deadline){
            setErrorDead('Must have a Deadline!');
        }
        if(title && description &&deadline) 


        try{
            let req = await fetch(`${process.env.REACT_APP_API_URL}/request/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId,
                    id,
                    title,
                    description,
                    deadline,
                    availability
                }),
            });
            console.log(req);
            console.log(availability);

            if (req.status !== 201) {
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
        <div className='create-req-cont'>
                <p className='text-white text-xl'>Update Your Request</p><br/>
                {!title ? <p className="error-message font-bold text-info" >{errorTitle}</p> : ''}
                <input
                className="text-black"
                    placeholder="Title"
                    type="title"
                    onChange={(updateTitle)}
                    /><br/>
                {!description ? <p className="error-message font-bold text-info" >{errorDescription}</p> : ''}
                <input className="text-black" placeholder="Description" type="description" onChange={(updateDescription)} /><br/>
                {!deadline ? <p className="error-message font-bold text-info" >{errorDeadline}</p> : ''}
                <input className="text-black" placeholder="YYYY-MM-DD" type="deadline" onChange={(updateDeadline)} /><br/>
                <a href="/" className="btn btn-secondary px-16" onClick={clientUpdateRequest}>Update Request</a><br/>
                <label className="btn px-16" onClick={()=>navigate(`/client/${clientId}`)}>Cancel</label>

            </div>
    )
}

export default UpdateRequest;