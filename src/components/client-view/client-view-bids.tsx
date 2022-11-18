import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Client } from '../../models/client';
import { Request } from '../../models/request';
import { Bid } from '../../models/bid';
import HHAPI from '../../utils/utility';

interface IClientViewBids {
    loggedInClient: Client | undefined;
    currentRequest: Request | undefined;
    setCurrentBid: (nextBid: Bid) => void;
}

export default function ClientViewBids(props: IClientViewBids){
    const [bids, setBids] = useState<Bid[] | undefined>();
    const [currentBid, setCurrentBid] = useState<Bid>();
    const currentUser = props.loggedInClient;
    const navigate = useNavigate();

    useEffect(() => {
        getBids();
    }, []);

    async function getBids(){
        let bids = await HHAPI(`/client/${currentUser?.id}/request/${props.currentRequest?.id}/bids`, 'GET')
        setBids(bids);
    }

    const updateBid = (e: SyntheticEvent, bid: Bid) => {
        e.preventDefault();
        props.setCurrentBid(bid)
        navigate(`/client/${currentUser?.id}/request/${props.currentRequest?.id}/bid/${bid.id}/update-bid`)
    }
    
    return (
        <>
            {bids?.map(bid => (
                <div key={bid.id}>
                    <br />
                    <div className="card w-96 bg-primary shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{props.currentRequest?.title}</h2>
                            <p>{props.currentRequest?.description}</p>
                            <p>{bid.amount}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={(e) => updateBid(e, bid)}>Update Bid</button>
                            </div>
                        </div>
                    </div>
                </div>  
            ))}
        </>
    )
}