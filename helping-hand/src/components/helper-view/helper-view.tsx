import { SyntheticEvent, useState } from 'react';
import { Helper } from '../../models/helper';

interface IHelperView {
    currentUser: Helper | undefined;
    setCurrentUser: (nextUser: Helper) => void;
}

export default function HelperView(props: IHelperView){

    let HelperViewRequests = async (e: SyntheticEvent) => {
        e.preventDefault();
        try{
            let res = await fetch('http://localhost:8080/helper/requests')
        } catch {}
    }

}