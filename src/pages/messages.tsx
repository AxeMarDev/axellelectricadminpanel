import {useEffect, useState} from "react";
import API, {tMessage} from "../API/API.ts";


export default function Messages(){

    const [messages, setMessages]= useState<tMessage[]>([])
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
                    <p className={"text-3xl text-gray-500 mb-5"}>/</p>
                </div>

                <div>
                    {messages.map((message)=>
                        <div>
                            {message.message}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}