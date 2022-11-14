import { SyntheticEvent, useEffect, useState } from 'react';
import { Helper } from '../../models/helper';
import { useNavigate } from 'react-router-dom';
import { Bid } from '../../models/bid';
import HHAPI from '../../utils/utility';

interface IHelperBidsProps {
    loggedInHelper: Helper | undefined;
}

function HelperBids(props: IHelperBidsProps) {
    const helper = props.loggedInHelper;
    const [bids, setBids] = useState<Bid[]>();
    const [message, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(helper)
        getBids()
    }, [])

    async function getBids() {
        const bids = await HHAPI(`/helper/${helper?.id}/bids`, 'GET')
        setBids(bids);
    }

    return (
        <>
            {bids?.map(bid => (
                <div key={bid.id}>
                    <br />
                    <div className="card w-96 bg-primary shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{bid.request.title}</h2>
                            <p>{bid.request.description}</p>
                            <p>{bid.amount}</p>
                            <p>{bid.status}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default HelperBids;