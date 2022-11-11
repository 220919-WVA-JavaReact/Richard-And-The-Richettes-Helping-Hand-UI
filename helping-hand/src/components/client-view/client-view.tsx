import { SyntheticEvent, useEffect, useState } from 'react';
import { Helper } from '../../models/helper';
import { GridColDef } from '@mui/x-data-grid';
import { Navigate } from 'react-router-dom';

interface IClientView {
    currentUser: Helper | undefined;
    setCurrentUser: (nextUser: Helper) => void;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'availability', headerName: 'Availability', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'deadline', headerName: 'Deadline', width: 200 }
];

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
                    'Authorization': 
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
    return (
        
    )