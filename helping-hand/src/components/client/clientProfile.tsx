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
            <ClientView loggedInClient={loggedInClient} setCurrentRequest={props.setCurrentRequest}/>
        </div>
    )
}

export default ClientProfile;