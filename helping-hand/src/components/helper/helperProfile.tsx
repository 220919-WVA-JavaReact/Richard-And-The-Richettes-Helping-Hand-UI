import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helper } from '../../models/helper';
import HelperBids from './HelperBids'

interface HelperProfileProps {
    loggedInHelper: Helper | undefined;
}

function HelperProfile(props: HelperProfileProps) {
    const helper = props.loggedInHelper;

    return (
        <div className='helperProfileContainer'>
            {/* <Requests /> */}
            <HelperBids loggedInHelper={helper}/>
        </div>
    )
}

export default HelperProfile;