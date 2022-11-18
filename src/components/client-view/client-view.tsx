import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Client } from '../../models/client';
import { Request } from '../../models/request';
import HHAPI from '../../utils/utility';

interface IClientView {
    loggedInClient: Client | undefined;
    setCurrentRequest: (nextRequest: Request) => void;
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

    const updateRequest = (e: SyntheticEvent, request: Request) => {
        e.preventDefault();
        props.setCurrentRequest(request)
        navigate(`/client/${currentUser?.id}/request/${request.id}/update-request`)
    }

    const viewBids = (e: SyntheticEvent, request: Request) => {
        e.preventDefault();
        props.setCurrentRequest(request)
        navigate(`/client/${currentUser?.id}/request/${request.id}/bids`)
    }
    
    return (
        <>
            {requests?.map(request => (
                <div key={request.id}>
                    <br />
                    <div className="card w-96 bg-primary shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{request.title}</h2>
                            <p>Description: {request.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={(e) => updateRequest(e, request)}>Update Request</button>
                                <button className="btn btn-primary" onClick={(e) => viewBids(e, request)}>View Bids</button>
                            </div>
                        </div>
                    </div>
                </div>  
            ))}
        </>
    )
}