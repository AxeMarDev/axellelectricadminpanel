import React, {useEffect, useState} from "react";
import API, {tProject} from "../API/API.ts";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";


type propsEntryOnRow = {fieldname:"name"|"id"|"location"|"imageurl"|"date",project: tProject, w:string, handleRefresh:()=>void, controlString:string, index:number}
function EntryOnRow( {fieldname,project,w, handleRefresh, controlString, index}:propsEntryOnRow){

    const [ newField , setNewField ] = useState(project[fieldname])
    const [ inEdit , setInEdit ] = useState(false)
    const [ controlEdit , setControlEdit ] = useState(false)
    const [ columnSelectredColor, setColumnSelectedColor ] = useState("")

    const handleResetField = ()=>{
        setInEdit(false)
        setNewField(project[fieldname])

    }

    const handleUpdateProject = () =>{
        const newProject:tProject = {...project, [fieldname]:newField}
        console.log( "new update: " + JSON.stringify(newProject))
        API.updateProject(newProject).then((resp)=>{
            console.log(resp)
            setInEdit(false)
            handleRefresh()
        })
    }


    const handleKeyPress = (event:React.KeyboardEvent<HTMLInputElement>) =>{
        const keyPressed = event.key;

        console.log(keyPressed)

        if( keyPressed ==="Enter"){
            handleUpdateProject()
        } else if(keyPressed === "Escape"){
            handleResetField()
        }

    }

    const handleBlur =()=>{
        if( newField === project[fieldname] ){
            handleResetField()
        }
    }

    // this will handle the controls of the table
    useEffect(() => {

        if(controlString[0] === `.`){
            if(controlString[1] === fieldname[0]){
                setColumnSelectedColor("bg-gray-500")

                if ( controlString[2 ] === `${index+1}`){
                    setInEdit(true)
                    setControlEdit(true)
                    if((controlString[controlString.length -1] === ';') || (controlString[controlString.length -2] === ';'  && controlString[controlString.length -1] === '/') ){
                        handleUpdateProject()
                    } else {
                        setNewField( controlString.substring(3))
                    }
                } else{
                    setInEdit(false)
                    setControlEdit(false)
                }

            } else if( controlString[1 ] === `${index+1}` && controlString[2] === fieldname[0] ){
                setInEdit(true)
                setControlEdit(true)

                if((controlString[controlString.length -1] === ';') || (controlString[controlString.length -2] === ';'  && controlString[controlString.length -1] === '/')){
                    if((controlString[controlString.length -2] === ';'  && controlString[controlString.length -1] === '/')){
                        handleUpdateProject()
                    }

                } else {
                    setNewField( controlString.substring(3))
                }

            } else {
                setNewField(project[fieldname])
                setColumnSelectedColor("")
                setInEdit(false)
                setControlEdit(false)
            }
        } else {
            setNewField(project[fieldname])
            setColumnSelectedColor("")
            setInEdit(false)
            setControlEdit(false)
        }

    }, [controlString]);

    return(
        !inEdit ? (
            <button className={`p-3 ${columnSelectredColor} ${w} flex justify-start hover:bg-gray-400 `} onClick={()=>setInEdit(true)}>
                <p className={"truncate"}>{project[fieldname]}</p>
            </button>
        ):(
            !controlEdit ? (
                <div className={`p-3  ${w} flex  bg-gray-800 flex-row`}>
                    <button className={"bg-red-500 rounded w-5 mr-1"} onClick={ ()=>handleResetField()}>x</button>
                    <input autoFocus onBlur={()=>handleBlur()} className={" w-36 bg-gray-800 focus:outline-none"} type={"text"} value={newField} onChange={(e)=>setNewField(e.target.value)} onKeyPress={(e) => handleKeyPress(e)}/>
                    <button className={"bg-green-500 rounded w-5"} onClick={()=>handleUpdateProject()}>y</button>
                </div>
            ):(
                <div className={`p-3  ${w} flex  bg-gray-800 flex-row truncate`}>
                    <p>{newField}</p>
                </div>
            )

        )

    )
}

type propsControlBar = { update:[controlString:string, setControlString:React.Dispatch<React.SetStateAction<string>>] }
function ControlBar({update:[controlString,setControlString]}:propsControlBar){


    const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {

        const chars = Array.from(controlString);
        const addToNum = chars.map((char, i) => {
            if (i === 2) {
                return String.fromCharCode((controlString[2].charCodeAt(0) - '0'.charCodeAt(0) + 1) % 10 + '0'.charCodeAt(0));
            }
            return char;
        });

        const subToNum = chars.map((char, i) => {
            if (i === 2) {
                return String.fromCharCode((controlString[2].charCodeAt(0) - '0'.charCodeAt(0) - 1 + 10) % 10 + '0'.charCodeAt(0));
            }
            return char;
        });

        const leftRow = chars.map((char, i) => {
            if (i === 1) {
                if( char === 'l'){
                    return 'n'
                } else if( char === 'n'){
                    return 'i'
                }  else if( char === 'i'){
                    return 'l'
                } else {
                    return char;
                }
            }
            return char;
        });

        const rightRow = chars.map((char, i) => {
            if (i === 1) {
                if( char === 'l'){
                    return 'i'
                } else if( char === 'n'){
                    return 'l'
                }  else if( char === 'i'){
                    return 'n'
                } else {
                    return char;
                }
            }
            return char;
        });

        switch (event.key) {
            case 'ArrowUp':
                setControlString( subToNum.join('')  )
                break;
            case 'ArrowDown':

                setControlString( addToNum.join('')  )
                break;

            case 'ArrowLeft':
                setControlString( leftRow.join('')  )
                break;
            case 'ArrowRight':
                setControlString( rightRow.join(''))
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        if(controlString[controlString.length-2] === ';' && controlString[controlString.length-1] === '/'){
            setControlString("")
        }
        if(controlString[controlString.length-2] === ';' && controlString[controlString.length-1] === ';'){
            setControlString("")
        }
    }, [controlString]);
    const handleUpdateString = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setControlString(e.target.value)
    }



    return(
        <div className={" w-full flex p-2 rounded"}>
            <div className={"border-2 border-gray-400 rounded w-full flex flex-row pl-3"}>
                <p className={"grid content-center text-white/50"}>{"$"}</p>
                <input  autoFocus  onKeyDown={(e)=>handleKeyDown(e)} className={"w-full bg-gray-800  py-3 pl-1  pr-3 text-white focus:outline-none"} type={"text"} value={controlString} onChange={(e)=>handleUpdateString(e)} />
            </div>
        </div>
    )
}

type propsProjectCard = {project: tProject, index:number, handleRefresh: ()=>void, controlString:string}
function ProjectCard({project, index, handleRefresh,controlString}:propsProjectCard){

    const [mouseOver , setMouseOver] = useState(false)

    useEffect(() => {

        if(controlString[0] === `.`){
            if( controlString[1 ] === `${index+1}` && controlString.length === 2){
                setMouseOver(true)

            } else {
                setMouseOver(false)

            }
        } else {
            setMouseOver(false)

        }

    }, [controlString]);

    return(
        <div className={`${!mouseOver? "bg-gray-600" : "bg-gray-500"}  text-white flex flex-row border-b-2  border-gray-700`} >
            <div className={"p-3 border-r-2 border-gray-700 w-12 flex justify-center "} onMouseOver={()=>setMouseOver(true)} onMouseLeave={()=>setMouseOver(false)}>
                <p>{index+1}</p>
            </div>
            <EntryOnRow fieldname={"name"} project={project} w={"w-52 border-r-2 border-gray-700"} handleRefresh={handleRefresh} controlString={controlString} index={index}/>
            <EntryOnRow fieldname={"location"} project={project} w={"w-52 border-r-2 border-gray-700"} handleRefresh={handleRefresh} controlString={controlString} index={index}/>
            <EntryOnRow fieldname={"imageurl"} project={project} w={"w-72"} handleRefresh={handleRefresh} controlString={controlString} index={index}/>
        </div>
    )
}


type propsProjectTable = {projects:tProject[], handleRefresh: ()=>void, controlString:string}
function ProjectTable({projects, handleRefresh,controlString}:propsProjectTable){

    const [ tableCommandError, setError ] = useState(false)

    useEffect(() => {
        const regex = /^\.(?:(\d{1,2})|[nli])(?:(?<=\d{1,2})[nli]|(?<=[nli])\d{1,2})?\S*$/;

        if( controlString[0] === '.' ){
            if( controlString.length >1 ){
                setError(regex.test(controlString));
                console.log(regex.test(controlString))
            } else{
                setError(true)
            }

        }

    }, [controlString]);
    return(
        <div className={"h-full bg-gray-600 rounded-lg  "}>
            <div className={"bg-gray-700 text-white flex flex-row   rounded-t-lg "}>
                <div className={`p-3 border-r-2 border-r-gray-600 text-gray-500 w-12 flex justify-center ${ controlString[0] === "." && controlString !== "" ? ( !tableCommandError ? "bg-red-500":"bg-green-800 rounded-tl" ) : ""} `}>
                    <p >{"(.)"}</p>
                </div>
                <div className={"p-3 border-r-2 border-r-gray-600 w-52 flex text-gray-500 justify-start font-bold"}>
                    <p>project name (n)</p>
                </div>
                <div className={"p-3 border-r-2 border-r-gray-600 w-52 flex text-gray-500 justify-start font-bold"}>
                    <p>location (l)</p>
                </div>
                <div className={"p-3 w-52 flex   justify-start text-gray-500 font-bold"}>
                    <p>image (i)</p>
                </div>
            </div>
            {projects.map((project, index, )=>{
                return <ProjectCard project={project} index={index} handleRefresh={handleRefresh} controlString={controlString} />
            })}
        </div>
    )
}

export default function Content(){

    const [inOutlet, setInOutlet] = useState(true)
    const [projects, setProjects] = useState<tProject[]>([])
    const [refresh, setRefresh] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname
    const [controlString, setControlString] = useState("")

    const handleRefresh = () =>{
        setRefresh(refresh+1)
    }

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

    },[navigate,refresh])



    return(
        inOutlet ? (
                <div className={"w-full flex flex-col justify-between "}>
                    <div className={"flex flex-col py-5 px-5  h-full"}>
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

                        <ProjectTable projects={projects} handleRefresh={handleRefresh} controlString={controlString}/>

                    </div>
                    <ControlBar update={[controlString, setControlString]}/>
                </div>
        ):(
            <Outlet/>
        )
    )
}