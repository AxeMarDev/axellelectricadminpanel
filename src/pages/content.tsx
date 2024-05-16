import {useEffect, useState} from "react";
import API, {tProject} from "../API/API.ts";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";


type propsProjectCard = {project: tProject, index:number}
function ProjectCard({project, index}:propsProjectCard){
    return(
        <div className={"bg-gray-600 text-white flex flex-row border-b-2 border-x-2 "}>
            <div className={"p-3 border-r-2 w-12 flex justify-center "}>
                <p>{index+1}</p>
            </div>
            <div className={"p-3 border-r-2 w-12 flex justify-center "}>
                <p>{project.id}</p>
            </div>
            <div className={"p-3 border-r-2 w-64 flex justify-start hover:bg-gray-400"}>
                <p>{project.name}</p>
            </div>
            <div className={"p-3  w-auto flex justify-center hover:bg-gray-400"}>
                <p>{project.location}</p>
            </div>
        </div>
    )
}


type propsProjectTable = {projects:tProject[]}
function ProjectTable({projects}:propsProjectTable){
    return(
        <>
            <div className={"bg-gray-700 text-white flex flex-row border-2 rounded-t-lg "}>
                <div className={"p-3 border-r-2 w-12 flex justify-center "}>
                    <p></p>
                </div>
                <div className={"p-3 border-r-2 w-12 flex justify-center font-bold"}>
                    <p>id</p>
                </div>
                <div className={"p-3 border-r-2 w-64 flex justify-start font-bold"}>
                    <p>project name</p>
                </div>
                <div className={"p-3  w-auto flex justify-center font-bold"}>
                    <p>location</p>
                </div>
            </div>
            {projects.map((project, index, )=>{
                return <ProjectCard project={project} index={index}/>
            })}
        </>
    )
}

export default function Content(){

    const [inOutlet, setInOutlet] = useState(true)
    const [projects, setProjects] = useState<tProject[]>([])
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    useEffect(()=>{
        if( currentPath !== "/content"){
            setInOutlet(false)
        } else{
            API.getProjects().then((projects)=>{
                console.log(projects.resp)
                setProjects(projects.resp)
            })
            setInOutlet(true)
        }
    },[navigate])



    return(
        inOutlet ? (
                <div className={"w-full"}>
                    <div className={"flex flex-col py-5 px-5 "}>
                        <div className={"flex flex-row"}>
                            <p className={"text-3xl text-white mb-5 mr-3"}>Content </p>
                            <p className={"text-3xl text-gray-500 mb-5"}>/projects</p>
                        </div>

                        <div className={"flex flex-row  mb-4"}>
                            <div className={" space-x-2 flex flex-row "}>
                                <Link className={"bg-gray-700 w-min flex whitespace-nowrap p-3 text-white rounded hover:bg-gray-500 "} to={"/content/add"}>Projects</Link>
                            </div>
                            <div className={"h-12 w-1 mx-2 rounded bg-gray-500"}/>
                            <div className={" space-x-2 flex flex-row "}>
                                <Link className={"bg-gray-700 w-min flex whitespace-nowrap p-3 text-white rounded hover:bg-gray-500 "} to={"/content/add"}>add project</Link>
                                {/*<Link className={"bg-gray-700 w-min flex whitespace-nowrap p-3 text-white rounded hover:bg-gray-500 "} to={"/content/delete"}>delete project</Link>*/}
                                <Link className={"bg-gray-700/20 w-min flex whitespace-nowrap p-3 text-white rounded text-white/20 "} to={"/content"}>delete project</Link>

                            </div>
                        </div>

                        <ProjectTable projects={projects}/>

                    </div>
                </div>
        ):(
            <Outlet/>
        )
    )
}