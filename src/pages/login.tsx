import API, {tCompany} from "../API/API.ts";
import React, {useState} from "react";
import { useNavigate} from "react-router-dom";


import Cookies from 'js-cookie';
import {cookieContent} from "../App.tsx";

type tAddCompany = tCompany & { username:string , email:string}
type propsLogin = { setId:React.Dispatch<React.SetStateAction<cookieContent>>}

export default function Login({ setId}:propsLogin){


    const [ newCompany , setNewCompany ] = useState<tAddCompany>({id:"", company_name:"", username:"", email:""})
    const navigate = useNavigate()

    return(
        <div className={"w-screen h-screen flex justify-center grid content-center"}>
            <div className={"rounded bg-gray-700 w-80"}>
                <input placeholder={"company name"} type={"text"} value={newCompany.company_name} onChange={(e)=>
                    setNewCompany({...newCompany, company_name: e.target.value}
                    )}/>
                <input placeholder={"username"} type={"text"} value={newCompany.username} onChange={(e)=>
                    setNewCompany({...newCompany, username: e.target.value}
                    )}/>
                <input placeholder={"email"} type={"text"} value={newCompany.email} onChange={(e)=>
                    setNewCompany({...newCompany, email: e.target.value}
                    )}/>
                <button onClick={()=>{
                    console.log(newCompany)
                    API.addCompany(newCompany).then((resp)=>{

                        Cookies.set('id', JSON.stringify({id:resp.resp.id, company: resp.resp.company_name, username: newCompany.username}), { expires: 7, path: '' });
                        setId({id:resp.resp.id, company: resp.resp.company_name, username: newCompany.username})
                        navigate(`/${resp.resp.id}`)
                    })
                }}>add company</button>

            </div>
        </div>
    )
}