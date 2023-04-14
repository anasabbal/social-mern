import { useEffect, useState } from "react";
import auth from './../../helper/auth-helper';



export default function AddPost(){
    const [values, setValues] = useState({
        text:'',
        photo:'',
        error:'',
        user: {}
    });
    useEffect(() => {
        setValues({...values, user: auth.isAuthenticated().user});
    }, [])
    

    return (
        <div></div>
    )
}