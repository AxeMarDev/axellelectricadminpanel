import './App.css'
import {BrowserRouter, Routes, Route, Link, useLocation} from "react-router-dom";
import Content from "./pages/content.tsx";
import {ReactNode} from "react";
import ProjectAdd from "./pages/projectadd.tsx";
import Projectdelete from "./pages/projectdelete.tsx";


type propsLinkButton = {to:string, children:ReactNode}
function LinkButton({to, children}:propsLinkButton){

    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <Link className={`text-white p-3 pr-16 rounded ${currentPath === to ? "bg-gray-500":""}`} to={to}>{children}</Link>
    )
}
function App() {

  return (
    <BrowserRouter>
        <div className={"bg-gray-800 w-screen h-screen overflow-y-scroll flex flex-row"}>
            <div className={"bg-gray-900 flex flex-col p-4"}>
                <LinkButton to={"/"}>home</LinkButton>
                <LinkButton to={"/messages"}>messages</LinkButton>
                <LinkButton to={"/content"}>content</LinkButton>
            </div>
            <Routes>
                <Route path="/" element={<p>message</p>}/>
                <Route path="/messages" element={<p>messages</p>}/>
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
