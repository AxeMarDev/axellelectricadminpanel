import './App.css'
import {BrowserRouter, Routes, Route, Link, useLocation} from "react-router-dom";
import Content from "./pages/content.tsx";
import {ReactNode} from "react";
import ProjectAdd from "./pages/projectadd.tsx";
import Projectdelete from "./pages/projectdelete.tsx";
import Messages from "./pages/messages.tsx";
import Home from "./pages";


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
            <div className={"flex flex-col bg-gray-900 justify-between"}>

                <div className={" flex flex-col p-4 space-y-2"}>
                    <div className={"w-full p-4 "}> Veronica Martinez</div>
                    <div className={"bg-gray-800 w-full h-[2px] rounded mb-3"}/>
                    <LinkButton to={"/"}>home</LinkButton>
                    <LinkButton to={"/messages"}>messages</LinkButton>
                    <LinkButton to={"/content"}>content</LinkButton>
                </div>
                <div className={"p-5 font-light"}>
                    <p className={"text-white/20 "}>ui: v0.0.1</p>
                    <p className={"text-white/20 "}>api: v0.0.1</p>
                </div>
            </div>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/content" element={ <Content/>}>
                    <Route path="add" element={ <ProjectAdd/> }></Route>
                    <Route path="delete" element={<Projectdelete/>}/>
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
