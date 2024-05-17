import React, {useState} from "react";


import API, {tProject} from "../API/API.ts";
import { useNavigate} from "react-router-dom";

type propsInputField = { fieldname:"name"|"location"|"imageurl", fieldsState:[fields:tProject, setFields:React.Dispatch<React.SetStateAction<tProject>>]}
function InputField({fieldname,fieldsState}:propsInputField){
    return(

        <input type={"text"} placeholder={fieldname} value={ fieldsState[0][fieldname] } onChange={(e)=>{
            fieldsState[1]( {...fieldsState[0], [fieldname]: e.target.value })
        }}/>
    )
}
export default function ProjectAdd(){

    const fieldState = useState({id:"", name:"", location:"", imageurl:"", date:""})
    const navigation = useNavigate()

    const handleEndAddProject = () =>{
        API.addProjects(fieldState[0]).then(()=>{
            navigation(-1)
        })
        fieldState[1]({id:"", name:"", location:"", imageurl:"", date:""})
    }


    return(
        <div className={"w-full"}>
            <div className={"flex flex-col py-5 px-5 "}>
                <div className={"flex flex-row"}>
                    <p className={"text-3xl text-white mb-5 mr-3"}>Content </p>
                    <p className={"text-3xl text-gray-500 mb-5"}>/projects/add</p>
                </div>

                <div className={"flex flex-row  mb-4"}>
                    <div className={" space-x-2 flex flex-row "}>
                        <button className={"bg-gray-700 w-min flex whitespace-nowrap p-3 text-white rounded hover:bg-gray-500 "} onClick={()=>navigation(-1)}>go back</button>
                    </div>
                    <div className={"h-12 w-1 mx-2 rounded bg-gray-500"}/>
                    <div className={" space-x-2 flex flex-row "}>
                        {/*links go in here*/}
                    </div>
                </div>


                <InputField fieldname={"name"}  fieldsState={fieldState}/>
                <InputField fieldname={"location"} fieldsState={fieldState}/>
                <InputField fieldname={"imageurl"} fieldsState={fieldState}/>

                <button onClick={()=>handleEndAddProject()}>submit</button>
            </div>

        </div>

    )
}