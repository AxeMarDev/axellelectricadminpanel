import { useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Cookies from "js-cookie";
import {cookieContent} from "../App.tsx";

type propsLanding = {id:cookieContent, setId:React.Dispatch<React.SetStateAction<cookieContent>>}
export default function Landing({setId}:propsLanding){

    const navigate = useNavigate()

    useEffect(() => {
        const value = Cookies.get('id'); // returns 'value' if the cookie exists
        console.log(value)
        if ( value !== undefined){
            setId( JSON.parse(value) )
            navigate(`/${JSON.parse(value).id}`)
        } else {
            navigate("/login")
        }

    }, []);

    return(
        <div>
            loading
        </div>
    )
}