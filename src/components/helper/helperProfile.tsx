import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helper } from '../../models/helper';
import HelperBids from './HelperBids'
import HelperView from '../helper-view/helper-view'
import { Request } from '../../models/request'

interface HelperProfileProps {
    loggedInHelper: Helper | undefined;
    setCurrentRequest: (nextRequest: Request) => void;
}

function HelperProfile(props: HelperProfileProps) {
    const helper = props.loggedInHelper;

    return (
        <div className='helperProfileContainer'>
            <div className="flex flex-col w-full lg:flex-row">
            <div className="grid flex-grow h-32 card place-items-center">
                <h1 className='text-xl'>Your Current Bids</h1>
                <HelperBids loggedInHelper={helper}/>
                </div> 
            <div className="grid flex-grow h-32 card place-items-center">
                <h2 className='text-xl'>Open Requests</h2>
                <HelperView loggedInHelper={helper} setCurrentRequest={props.setCurrentRequest}/>
                </div>
            </div>
        </div>
    )
}

export default HelperProfile;