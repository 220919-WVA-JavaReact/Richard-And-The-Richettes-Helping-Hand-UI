import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Client } from '../../models/client';
import CreateRequest from '../create-request/create-request';

interface ClientProfileProps {
    loggedInClient: Client | undefined;
}

function ClientProfile(props: ClientProfileProps) {
    const loggedInClient = props.loggedInClient;

    return (
        <div className='clientProfileContainer'>
            {/* <ClientRequests /> */}
        </div>
    )
}

export default ClientProfile;