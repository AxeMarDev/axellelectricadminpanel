import {Outlet} from "react-router-dom";



export default function Home(){

    return(
        <div className={"w-screen h-screen  flex "}>
            <Outlet/>
        </div>
    )
}

// <p className={"text-white text-xl"}>COMPANIES </p>
// {companies.map((company)=>(
//     <p>{company.company_name}</p>
// ))}
//
// <p className={"text-white text-xl"}>EMPLOYEES </p>
// {employees.map((employee)=>(
//     <p>{employee.first_name}</p>
// ))}