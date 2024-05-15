import React, {useEffect, useState} from "react";
import API, {tProject} from "./API/API.ts";


type propsInputField = { fieldname:"name"|"location"|"imageurl", fieldsState:[fields:tProject, setFields:React.Dispatch<React.SetStateAction<tProject>>]}
function InputField({fieldname,fieldsState}:propsInputField){
    return(

        <input type={"text"} placeholder={fieldname} value={ fieldsState[0][fieldname] } onChange={(e)=>{
            fieldsState[1]( {...fieldsState[0], [fieldname]: e.target.value })
        }}/>
    )
}
export default function Home(){

    const [projects, setProjects] = useState<tProject[]>([])
    const [refresh, setRefresh] = useState(0)
    const [idToDelete , setidToDelete] = useState("")
    const fieldState = useState(
        {id:"", name:"", location:"", imageurl:""})

    useEffect(()=>{
        API.getProjects().then((projects)=>{
            console.log(projects.resp)
            setProjects(projects.resp)
        })
    },[refresh])

    const handleEndDeleteProject = () =>{
        API.deleteProjects(idToDelete).then(()=>{

            setRefresh(refresh+1)
        })
        setidToDelete("")
    }

    const handleEndAddProject = () =>{
        API.addProjects(fieldState[0]).then(()=>{
            setRefresh(refresh+1)
        })
        fieldState[1]({id:"", name:"", location:"", imageurl:""})
    }

    return(
        <div>
            <div className={"flex flex-col p-10"}>
                {projects.map((project)=>{
                    return <p>id: {project.id}, name: {project.name}, location: {project.location}, image: {project.imageurl}</p>
                })}
                <InputField fieldname={"name"}  fieldsState={fieldState}/>
                <InputField fieldname={"location"} fieldsState={fieldState}/>
                <InputField fieldname={"imageurl"} fieldsState={fieldState}/>
                <button onClick={()=>handleEndAddProject()}>submit</button>
                <input type={"text"} placeholder={"id"} value={idToDelete} onChange={(e)=>setidToDelete(e.target.value)}/>
                <button onClick={()=>handleEndDeleteProject() }>submit</button>
            </div>
        </div>
    )
}