import API from "../API/API.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Projectdelete(){

    const [idToDelete , setidToDelete] = useState("")
    const navigation = useNavigate()

    const handleEndDeleteProject = () =>{
        API.deleteProjects(idToDelete).then(()=>{
            navigation(-1)
        })
        setidToDelete("")
    }

    return(
        <div>
            <button onClick={()=>navigation(-1)}>go back</button>
            <button onClick={()=>handleEndDeleteProject() }>submit</button>
            <input type={"text"} placeholder={"id"} value={idToDelete} onChange={(e)=>setidToDelete(e.target.value)}/>
        </div>
    )
}