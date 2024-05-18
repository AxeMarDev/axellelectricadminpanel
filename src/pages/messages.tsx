import {useEffect, useState} from "react";
import API, {tMessage, tMessages} from "../API/API.ts";


type propsMessageCard = {message: tMessage, index:number, handleRefresh: ()=>void}
function MessageCard({message, index, handleRefresh}:propsMessageCard){
    const [mouseOver, setMouseOver]=useState(false)
    const [ mouseOverRead, setMouseOverRead ] = useState(false)

    const handleChangeRead = () =>{
        API.updateMessage({...message, read: !message.read}).then(()=>{
            handleRefresh()
        })
    }



    return(
        <div className={ `${!mouseOver? "bg-gray-600":"bg-gray-500"} text-white flex flex-row border-b-2 border-b-gray-700`} onMouseOver={()=>setMouseOver(true)} onMouseLeave={()=>setMouseOver(false)}>
            <div className={"p-3 border-r-2 border-r-gray-700 w-12 flex justify-center "}>
                <p>{index+1}</p>
            </div>
            <div className={"p-3 border-r-2  border-r-gray-700 w-32 flex justify-start "}>
                <p className={"truncate"}>{message.name}</p>
            </div>
            <div className={"p-3  w-40 border-r-2 flex justify-center border-r-gray-700 "}>
                <div onMouseOver={()=>setMouseOverRead(true)} onMouseLeave={()=>setMouseOverRead(false)}>
                    {!mouseOverRead ? (
                        <div className={`${message.read ? "bg-green-700 rounded px-2 border border-green-400" : "bg-yellow-800 rounded px-2 border border-yellow-400"} w-20`}>{message.read ? (<p>read</p>) : (<p> not read</p>)}</div>
                    ):(
                        <button onClick={()=>handleChangeRead()} className={"hover:bg-green-500 bg-white/0 w-20"}>
                            <div className={`${message.read ? "bg-red-700 rounded px-2 border border-red-400" : "bg-blue-800 rounded px-2 border border-blue-400"} `}>{!message.read ? (<p>read</p>) : (<p> un read</p>)}</div>
                        </button>
                    )}
                </div>


            </div>
            <div className={"p-3  w-auto flex justify-center "}>
                <p>{message.message}</p>
            </div>
        </div>
    )
}


type propsMessagesTable = {messages:tMessages, handleRefresh: ()=>void}
function MessagesTable({messages, handleRefresh}:propsMessagesTable){
    return(
        <div className={"h-full bg-gray-600 rounded-lg  "}>
            <div className={"bg-gray-700 text-white flex flex-row rounded-t-lg "}>
                <div className={"p-3 border-r-2 border-r-gray-600 w-12 flex justify-center "}>
                    <p></p>
                </div>
                <div className={"p-3 border-r-2 border-r-gray-600 w-32 flex justify-start font-bold"}>
                    <p>name</p>
                </div>
                <div className={"p-3 border-r-2 border-r-gray-600 w-40 flex justify-center font-bold"}>
                    <p>read</p>
                </div>
                <div className={"p-3  w-auto flex justify-center font-bold"}>
                    <p>message</p>
                </div>
            </div>
            {messages.map((message, index, )=>{
                return <MessageCard message={message} index={index} handleRefresh={handleRefresh}/>
            })}
        </div>
    )
}

export default function Messages(){

    const [messages, setMessages]= useState<tMessages>([])
    const [refresh, setRefresh ]= useState( false)
    const [ filterRead , setFilterRead ] = useState(true)

    const handleRefresh = () =>{
        setRefresh(!refresh )
    }

    useEffect(()=>{
        API.getMessages().then((resp)=>{

            const filteredArray:tMessage[] = resp.resp.filter((message)=>{
                if(filterRead ){
                    if( !message.read ){
                        return message
                    }
                } else{
                    if( message.read ){
                        return message
                    }
                }
            })

            setMessages( filteredArray as tMessages )
        })
    },[refresh])
    return(
        <div className={"w-full flex flex-col justify-between"}>
            <div className={"flex flex-col py-5 px-5 h-full"}>
                <div className={"flex flex-row"}>
                    <p className={"text-3xl text-white mb-5 mr-3"}>Messages </p>
                    <p className={"text-3xl text-gray-500 mb-5"}>{ filterRead? "/unread" : "/read"}</p>
                </div>
                <div className={"flex flex-row  mb-4"}>
                    <div className={" space-x-2 flex flex-row "}>
                        <button className={"bg-gray-700 w-min flex whitespace-nowrap p-3 text-white rounded hover:bg-gray-500 "} onClick={()=>{
                            setFilterRead(!filterRead)
                            setRefresh(!refresh)
                        }}>{filterRead?"Unread":"read"}</button>
                    </div>
                    <div className={"h-12 w-1 mx-2 rounded bg-gray-500"}/>
                    <div className={" space-x-2 flex flex-row "}>
                        {/*<Link className={"bg-gray-700 w-min flex whitespace-nowrap p-3 text-white rounded hover:bg-gray-500 "} to={"/content/delete"}>delete project</Link>*/}
                    </div>
                </div>
                <MessagesTable messages={messages} handleRefresh={handleRefresh}/>
            </div>
        </div>
    )
}