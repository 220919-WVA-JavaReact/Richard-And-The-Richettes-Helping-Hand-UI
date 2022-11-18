import { SyntheticEvent, useEffect, useState } from 'react';
import { Helper } from '../../models/helper';
import { useNavigate } from 'react-router-dom';
import { Bid } from '../../models/bid';
import HHAPI from '../../utils/utility';

interface IHelperBidsProps {
    loggedInHelper: Helper | undefined;
    setCurrentBid: (nextBid: Bid) => void;
}

function HelperBids(props: IHelperBidsProps) {
    const helper = props.loggedInHelper;
    const [bids, setBids] = useState<Bid[]>();
    const [message, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(helper)
        getBids()
    }, [])

    async function getBids() {
        const bids = await HHAPI(`/helper/${helper?.id}/bids`, 'GET')
        setBids(bids);
    }

    const updateBid = (e: SyntheticEvent, bid: Bid) => {
        e.preventDefault();
        props.setCurrentBid(bid)
        navigate(`/helper/${helper?.id}/bid/${bid.id}/update-bid`)
    }

    return (
        <>
            {bids?.map(bid => (
                <div key={bid.id}>
                    <br />
                    <div className="card w-96 bg-primary shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{bid.request.title}</h2>
                            <p>Request Description{bid.request.description}</p>
                            <p>Bid Amount: ${bid.amount}</p>
                            <p>Bid Status: {bid.status}</p>
                            <button className="btn btn-primary" onClick={(e) => updateBid(e, bid)}>Update Bid Amount</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default HelperBids;