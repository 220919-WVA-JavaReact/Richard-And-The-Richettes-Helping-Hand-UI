import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helper } from '../../models/helper';
import HelperBids from './HelperBids'
import HelperView from '../helper-view/helper-view'

interface HelperProfileProps {
    loggedInHelper: Helper | undefined;
}

function HelperProfile(props: HelperProfileProps) {
    const helper = props.loggedInHelper;

    return (
        <div className='helperProfileContainer'>
            <HelperBids loggedInHelper={helper}/>
            <HelperView loggedInHelper={helper}/>
        </div>
    )
}

export default HelperProfile;