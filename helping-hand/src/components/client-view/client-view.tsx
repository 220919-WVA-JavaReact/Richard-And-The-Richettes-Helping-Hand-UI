import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Client } from '../../models/client';
import { Request } from '../../models/request';
import HHAPI from '../../utils/utility';

interface IClientView {
    loggedInClient: Client | undefined;
}

export default function ClientView(props: IClientView){
    const [requests, setRequests] = useState<Request[] | undefined>();
    const currentUser = props.loggedInClient;
    const navigate = useNavigate();

    useEffect(() => {
        ClientViewRequests();
    }, []);

    async function ClientViewRequests(){
        let requests = await HHAPI(`/client/${currentUser?.id}/requests`, 'GET')
        setRequests(requests);
    }
    
    return (
        <>
            {requests?.map(request => (
                <div key={request.id}>
                    <br />
                    <div className="card w-96 bg-primary shadow-xl">
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