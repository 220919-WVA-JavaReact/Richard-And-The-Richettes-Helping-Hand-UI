import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../models/client';
import './create-request.css';

interface ICreateReqProps {
    loggedInClient: Client | undefined;
}

function CreateRequest(props: ICreateReqProps){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [errorTitle, setErrorTitle] = useState(" ");
    const [errorDescription, setErrorDescription] = useState(" ");
    const [errorDeadline, setErrorDead] = useState(" ");
    const navigate = useNavigate();
    const client = props.loggedInClient;
    const clientId = client?.id;

    const updateTitle = (e: SyntheticEvent) => {
        setTitle((e.target as HTMLInputElement).value);
    };
    const updateDescription = (e: SyntheticEvent) => {
        setDescription((e.target as HTMLInputElement).value);
    };
    const updateDeadline = (e: SyntheticEvent) => {
        setDeadline((e.target as HTMLInputElement).value);
    };

    async function clientCreateRequest(e: SyntheticEvent) {
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
        if(title && description &&deadline){


        try{
            let res = await fetch(`${process.env.REACT_APP_API_URL}/request`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    clientId,
                    title,
                    description,
                    deadline
                }),
            });
            if (res.status !== 201){
                console.log(res);
                console.log(res.status);
                console.log("could not connect")
            } else {
                const result = await res.json();
                return navigate(`/client/${client?.id}`);
            }
        } catch (err) {
            console.log("Error talking to API");
        }
        }
    }

        return  (
            <div className='create-req-cont'>
                <p className='text-white text-xl'>Create a Request</p><br/>
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
                <a href="/" className="btn btn-secondary px-16" onClick={clientCreateRequest}>Create</a><br/>
                <label className="btn px-16" onClick={()=>navigate(`/client/${client?.id}`)}>Cancel</label>

            </div>
        )
}

export default CreateRequest
