import {useEffect, useState} from "react";
import API, {tMessage, tMessages} from "../API/API.ts";
import {Link} from "react-router-dom";


type propsMessageCard = {message: tMessage, index:number}
function MessageCard({message, index}:propsMessageCard){
    const [mouseOver, setMouseOver]=useState(false)

    return(
        <div className={ `${!mouseOver? "bg-gray-600":"bg-gray-500"} text-white flex flex-row border-b-2 border-x-2 `} onMouseOver={()=>setMouseOver(true)} onMouseLeave={()=>setMouseOver(false)}>
            <div className={"p-3 border-r-2 w-12 flex justify-center "}>
                <p>{index+1}</p>
            </div>
            <div className={"p-3 border-r-2 w-64 flex justify-start "}>
                <p>{message.name}</p>
            </div>
            <div className={"p-3  w-auto flex justify-center "}>
                <p>{message.message}</p>
            </div>
        </div>
    )
}


type propsMessagesTable = {messages:tMessages}
function MessagesTable({messages}:propsMessagesTable){
    return(
        <>
            <div className={"bg-gray-700 text-white flex flex-row border-2 rounded-t-lg "}>
                <div className={"p-3 border-r-2 w-12 flex justify-center "}>
                    <p></p>
                </div>
                <div className={"p-3 border-r-2 w-64 flex justify-start font-bold"}>
                    <p>name</p>
                </div>
                <div className={"p-3  w-auto flex justify-center font-bold"}>
                    <p>message</p>
                </div>
            </div>
            {messages.map((message, index, )=>{
                return <MessageCard message={message} index={index}/>
            })}
        </>
    )
}

export default function Messages(){

    const [messages, setMessages]= useState<tMessages>([])
    useEffect(()=>{
        API.getMessages().then((resp)=>{
            setMessages(resp.resp)
        })
    },[])
    return(
        <div className={"w-full"}>
            <div className={"flex flex-col py-5 px-5 "}>
                <div className={"flex flex-row"}>
                    <p className={"text-3xl text-white mb-5 mr-3"}>Messages </p>
                    <p className={"text-3xl text-gray-500 mb-5"}>/unread</p>
                </div>
                <div className={"flex flex-row  mb-4"}>
                    <div className={" space-x-2 flex flex-row "}>
                        <Link className={"bg-gray-700 w-min flex whitespace-nowrap p-3 text-white rounded hover:bg-gray-500 "} to={"/content/add"}>Unread</Link>
                    </div>
                    <div className={"h-12 w-1 mx-2 rounded bg-gray-500"}/>
                    <div className={" space-x-2 flex flex-row "}>
                        {/*<Link className={"bg-gray-700 w-min flex whitespace-nowrap p-3 text-white rounded hover:bg-gray-500 "} to={"/content/delete"}>delete project</Link>*/}
                    </div>
                </div>

                <MessagesTable messages={messages}/>


            </div>
        </div>
    )
}