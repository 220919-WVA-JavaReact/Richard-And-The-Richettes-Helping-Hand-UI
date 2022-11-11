import { SyntheticEvent, useEffect, useState } from 'react';
import { Helper } from '../../models/helper';
import { Navigate } from 'react-router-dom';

interface IHelperView {
    currentUser: Helper | undefined;
    setCurrentUser: (nextUser: Helper) => void;
}


export default function HelperView(props: IHelperView){

    const [reequests, setRequests] = useState<Request[]>([] as Request[]);
    const [message, setErrorMessage] = useState('');

    useEffect(() => {
        HelperViewRequests();
        return function(){

        };
    }, []);



    // let HelperViewRequests = async (e: SyntheticEvent) => {
        // e.preventDefault();
        async function HelperViewRequests(){
        try{
            let res = await fetch('http://localhost:8080/helper/requests', {
                method: 'GET',
                headers: {
                    'Authorization': 'helperid'
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