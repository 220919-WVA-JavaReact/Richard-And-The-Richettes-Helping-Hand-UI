import React, { SyntheticEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Client } from '../../models/client';

interface ICreateReqProps {
    loggedInClient: Client | undefined;
}

function CreateRequest(props: ICreateReqProps){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();

    const updateTitle = (e: SyntheticEvent) => {
        setTitle((e.target as HTMLInputElement).value);
    };
    const updateDescription = (e: SyntheticEvent) => {
        setDescription((e.target as HTMLInputElement).value);
    };
    const updateDeadline = (e: SyntheticEvent) => {
        setDeadline((e.target as HTMLInputElement).value);
    };

    let clientCreateRequest = async (e: SyntheticEvent) => {
        e.preventDefault();
        try{
            let res = await fetch("http://localhost:8080/client/create-request", {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({
                    title,
                    description,
                    deadline
                }),
            });
            console.log(res);

            if (res.status !== 201){
                console.log(res);
                console.log(res.status);
                console.log("could not connect")
            } else {
                const result = await res.json();
                return navigate(`client/${result.clientId}`);
            }
        } catch (err) {
            console.log("Error talking to API");
        } 
    }

        return  (
            <div>
                <p>Create a Request</p>

                <input
                className="text-black"
                    placeholder="Title"
                    type="title"
                    onChange={(updateTitle)}
                    /><br></br>
                <input className="text-black" placeholder="Description" type="description" onChange={(updateDescription)} />
                <input className="text-black" placeholder="Deadline" type="deadline" onChange={(updateDeadline)} />
                <a href="/" className="btn btn-secondary" onClick={clientCreateRequest}>Create</a> 
                <a href="#" className="btn">Cancel</a>
                
            </div>
        )
}

export default CreateRequest