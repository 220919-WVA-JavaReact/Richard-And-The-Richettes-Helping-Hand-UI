import { SyntheticEvent, useEffect, useState } from 'react';
import { Helper } from '../../models/helper';
import { Navigate } from 'react-router-dom';

interface IClientView {
    currentUser: Helper | undefined;
    setCurrentUser: (nextUser: Helper) => void;
}

export default function clientView(props: IClientView){

    const [reequests, setRequests] = useState<Request[]>([] as Request[]);
    const [message, setErrorMessage] = useState('');

    useEffect(() => {
        clientViewRequests();
        return function(){

        };
    }, []);



    // let HelperViewRequests = async (e: SyntheticEvent) => {
        // e.preventDefault();
        async function clientViewRequests(){
        try{
            let res = await fetch('http://localhost:8080/helper/requests', {
                method: 'GET',
                headers: {
                    'Authorization': 'clientid' // placeholder, just need clientId for auth
                }
            });

            if (res.status != 200) {
                setErrorMessage('Could not find requests.');
            } else {
                setRequests(await res.json());
                return ;
            }
        } catch (err) {
            setErrorMessage('Could not connect to database');
        }
    }
    // return (
        
    // )
}