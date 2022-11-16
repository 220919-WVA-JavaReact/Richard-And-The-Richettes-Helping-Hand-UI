import { SyntheticEvent, useEffect, useState } from 'react';
import { Helper } from '../../models/helper';
import { useNavigate } from 'react-router-dom';
import { Request } from '../../models/request';
import HHAPI from '../../utils/utility';

interface IHelperView {
    loggedInHelper: Helper | undefined;
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
    return (
      <>
      {requests?.map(request => (
      <div key={request.id}>
          <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                  <h2 className="card-title">{request.title}</h2>
                  <p>{request.description}</p>
                  <div className="card-actions justify-end">
                      <button className="btn btn-primary">Bid on Request</button>
                  </div>
              </div>
          </div>
      </div>  
      )
          )}
  </>
        
    )
}