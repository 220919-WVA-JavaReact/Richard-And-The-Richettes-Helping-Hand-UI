import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Client } from '../../models/client';

interface ClientProfileProps {
    loggedInClient: Client | undefined;
}

function ClientProfile(props: ClientProfileProps) {


    return (
        <div className='clientProfileContainer'>
            {/* <CreateRequest /> */}
            {/* <ClientRequests /> */}
        </div>
    )
}

export default ClientProfile;