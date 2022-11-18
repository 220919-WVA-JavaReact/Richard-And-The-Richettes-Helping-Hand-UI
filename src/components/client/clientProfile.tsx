import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Client } from '../../models/client';
import ClientView from '../client-view/client-view';
import { Request } from '../../models/request'

interface ClientProfileProps {
    loggedInClient: Client | undefined;
    setCurrentRequest: (nextRequest: Request) => void;
}

function ClientProfile(props: ClientProfileProps) {
    const loggedInClient = props.loggedInClient;

    return (
        <div className='clientProfileContainer'>
            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow h-32 card place-items-center">
                    <h1 className='text-xl'>Your Current Bids</h1>
                    <ClientView loggedInClient={loggedInClient} setCurrentRequest={props.setCurrentRequest}/>
                </div> 
            </div>
        </div>
    )
}

export default ClientProfile;