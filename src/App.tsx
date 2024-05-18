import './App.css'
import {BrowserRouter, Routes, Route, Link, useLocation, useNavigate} from "react-router-dom";
import Content from "./pages/content.tsx";
import {ReactNode, useEffect, useState} from "react";
import ProjectAdd from "./pages/projectadd.tsx";
import Projectdelete from "./pages/projectdelete.tsx";
import Messages from "./pages/messages.tsx";
import Home from "./pages";
import Login from "./pages/login.tsx";
import Landing from "./pages/landing.tsx";
import Cookies from "js-cookie";


export type cookieContent = { id:string, company:string, username:string}
function RoutesGroup(){

    const location = useLocation()
    const [id, setId] = useState<cookieContent>({id:"",company:"",username:""})
    const [loading, setLoading] =useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const value = Cookies.get('id'); // returns 'value' if the cookie exists
        console.log(value)
        if ( value !== undefined){
            setId( JSON.parse(value) )
            navigate(location.pathname)
            setLoading(false)
        } else {
            navigate("/login")
            setLoading(false)
        }

    }, []);


    return(
        <>
            {!loading && (
                <div className={" flex flex-row w-screen h-screen overflow-y-scroll"}>
                    { location.pathname !== "/login" && (
                        <div className={"flex flex-col bg-gray-900 justify-between"} >

                            <div className={" flex flex-col p-4 space-y-2"}>
                                <div className={"w-full p-2 rounded border-2 border-gray-800 flex flex-col"}>
                                    <p className={"font-black text-white"}> { id.company }</p>
                                    <p className={"text-gray-600 font-light"}>@{ id.username }</p>
                                </div>
                                <div className={"bg-gray-800 w-full h-[2px] rounded mb-3"}/>
                                <LinkButton to={`/${id.id}`}>home</LinkButton>
                                <LinkButton to={`/${id.id}/messages`}>messages</LinkButton>
                                <LinkButton to={`/${id.id}/content`}>content</LinkButton>
                            </div>
                            <div className={"p-5 font-light"}>
                                <p className={"text-white/20 "}>ui: v0.0.1</p>
                                <p className={"text-white/20 "}>api: v0.0.1</p>
                            </div>
                        </div>
                    )}
                    <Routes>
                        <Route path={"/"} element={<Landing id={id} setId={setId}/>}/>
                        <Route path={"/login"} element={<Login setId={setId} />}/>
                        <Route path={`/${id.id}`} element={<Home/>}>
                            <Route path="messages" element={<Messages/>}/>
                            <Route path="content" element={ <Content id={id}/>}>
                                <Route path="add" element={ <ProjectAdd/> }></Route>
                                <Route path="delete" element={<Projectdelete/>}/>
                            </Route>
                        </Route>

                    </Routes>
                </div>
            )}
        </>

    )
}


type propsLinkButton = {to:string, children:ReactNode}
function LinkButton({to, children}:propsLinkButton){

    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <Link className={`text-white  pl-3 py-2 pr-28 rounded ${currentPath === to ? "bg-gray-500":"hover:bg-gray-600"}`} to={to}>{children}</Link>
    )
}
function App() {



    return (
        <BrowserRouter>
            <div className={"bg-gray-800 w-screen h-screen overflow-y-scroll flex flex-row "}>
                <RoutesGroup/>
            </div>
        </BrowserRouter>
    )
}

export default App
