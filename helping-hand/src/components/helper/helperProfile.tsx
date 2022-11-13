import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helper } from '../../models/helper';

interface HelperProfileProps {
    loggedInHelper: Helper | undefined;
}

function HelperProfile(props: HelperProfileProps) {

    return (
        <div className='helperProfileContainer'>
            {/* <Requests /> */}
            {/* <Bids /> */}
        </div>
    )
}

export default HelperProfile;