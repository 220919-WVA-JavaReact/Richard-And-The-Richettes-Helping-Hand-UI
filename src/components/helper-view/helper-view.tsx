import { SyntheticEvent, useEffect, useState } from 'react';
import { Helper } from '../../models/helper';
import { useNavigate } from 'react-router-dom';
import { Request } from '../../models/request';
import HHAPI from '../../utils/utility';

interface IHelperView {
    loggedInHelper: Helper | undefined;
    setCurrentRequest: (nextRequest: Request) => void;
  }


export default function HelperView(props: IHelperView){

    const [requests, setRequests] = useState<Request[]>([] as Request[]);
    const [message, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const currentUser = props.loggedInHelper;

    useEffect(() => {
        HelperViewRequests();
    }, []);

    async function HelperViewRequests(){
        let requests = await HHAPI('/helper/requests', 'GET')
        setRequests(requests);
    }

    const bidOnRequest = (e: SyntheticEvent, request: Request) => {
        e.preventDefault();
        console.log(request, "set current request")
        props.setCurrentRequest(request)
        navigate(`/request/${request.id}/new-bid`)
    }

    return (
      <>
      {requests?.map(request => (
      <div key={request.id}>
        <br />
          <div className="card w-96 bg-primary shadow-xl text-center">
              <div className="card-body">
                  <h2 className="card-title">{request.title}</h2>
                  <p>{request.description}</p>
                  <div className="card-actions justify-end">
                      <button className="btn btn-primary" onClick={(e) => bidOnRequest(e, request)}>Bid on Request</button>
                  </div>
              </div>
          </div>
      </div>  
      )
          )}
  </>
        
    )
}