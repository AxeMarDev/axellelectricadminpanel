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

        <div className={"w-full"}>
            <div className={"flex flex-col py-5 px-5 "}>
                <div className={"flex flex-row"}>
                    <p className={"text-3xl text-white mb-5 mr-3"}>Content </p>
                    <p className={"text-3xl text-gray-500 mb-5"}>/projects/delete</p>
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

                <button onClick={()=>handleEndDeleteProject() }>submit</button>
                <input type={"text"} placeholder={"id"} value={idToDelete} onChange={(e)=>setidToDelete(e.target.value)}/>
            </div>

        </div>

    )
}