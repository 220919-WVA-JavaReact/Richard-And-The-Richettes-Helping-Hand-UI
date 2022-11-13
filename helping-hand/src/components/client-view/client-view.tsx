import { SyntheticEvent, useEffect, useState } from 'react';
import { Helper } from '../../models/helper';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../models/client';
import { request } from 'http';

interface IClientView {
    loggedInClient: Client | undefined;
}

export default function ClientView(props: IClientView){
    const [requests, setRequests] = useState<Request[] | undefined>();
    const [message, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const currentUser = props.loggedInClient;

    useEffect(() => {
        ClientViewRequests();
        return function(){

        };
    }, []);

    async function ClientViewRequests(){
        try{
            let res = await fetch(`http://localhost:8080/client/${currentUser?.id}/requests`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' 
                }
            });
            if (res.status != 200) {
                setErrorMessage('Could not find requests.');
            } else {
                const requestArray = await res.json();
                setRequests(requestArray);
                return navigate(`client/${currentUser?.id}`);
            }
        } catch (err) {
            setErrorMessage('Could not connect to database');
        }
    }
    return (
        <>
            {requests?.map(request => (
                <div key={request.id}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{request.title}</h2>
                            <p>{request.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Close</button>
                            </div>
                        </div>
                    </div>
                </div>  
            ))}
        </>
    )
}