import React, {useState} from "react";


import API, {tProject} from "../API/API.ts";
import {useNavigate} from "react-router-dom";

type propsInputField = { fieldname:"name"|"location"|"imageurl", fieldsState:[fields:tProject, setFields:React.Dispatch<React.SetStateAction<tProject>>]}
function InputField({fieldname,fieldsState}:propsInputField){
    return(

        <input type={"text"} placeholder={fieldname} value={ fieldsState[0][fieldname] } onChange={(e)=>{
            fieldsState[1]( {...fieldsState[0], [fieldname]: e.target.value })
        }}/>
    )
}
export default function ProjectAdd(){

    const fieldState = useState({id:"", name:"", location:"", imageurl:""})
    const navigation = useNavigate()

    const handleEndAddProject = () =>{
        API.addProjects(fieldState[0]).then(()=>{
            navigation(-1)
        })
        fieldState[1]({id:"", name:"", location:"", imageurl:""})
    }


    return(
        <div>
            <button onClick={()=>navigation(-1)}>go back</button>
            <InputField fieldname={"name"}  fieldsState={fieldState}/>
            <InputField fieldname={"location"} fieldsState={fieldState}/>
            <InputField fieldname={"imageurl"} fieldsState={fieldState}/>
            <button onClick={()=>handleEndAddProject()}>submit</button>
        </div>
    )
}