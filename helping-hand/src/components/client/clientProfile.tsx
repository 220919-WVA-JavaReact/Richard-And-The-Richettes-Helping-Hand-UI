import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Client } from '../../models/client';
import ClientView from '../client-view/client-view';

interface ClientProfileProps {
    loggedInClient: Client | undefined;
}

function ClientProfile(props: ClientProfileProps) {
    const loggedInClient = props.loggedInClient;

    return (
        <div className='clientProfileContainer'>
            <ClientView loggedInClient={loggedInClient}/>
        </div>
    )
}

export default ClientProfile;