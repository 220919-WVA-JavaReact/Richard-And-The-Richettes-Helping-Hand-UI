import { SyntheticEvent, useState } from "react";
import { Helper } from "../../models/helper";

interface IHelperView {
    currentUser: Helper | undefined;
    setCurrentUser: (nextUser: Helper) => void;
}

export default function HelperView(props: IHelperView){

}