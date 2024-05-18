import {useEffect, useState} from "react";
import API, {tCompany} from "../API/API.ts";

export default function Home(){

    const [ companies, setCompanies ] = useState<tCompany[]>([])
    const [ newCompany , setNewCompany ] = useState<tCompany>({id:"", company_name:""})
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        API.getCompanies().then((resp)=>{
            setCompanies( resp.resp )
        })
    }, [refresh]);

    return(
        <div>

            <p className={"text-white text-xl"}>COMPANIES </p>
            {companies.map((company)=>(
                <p>{company.company_name}</p>
            ))}

            <input placeholder={"company name"} type={"text"} value={newCompany.company_name} onChange={(e)=>
                setNewCompany({...newCompany, company_name: e.target.value}
                )}/>
            <button onClick={()=>{
                API.addCompany(newCompany).then(()=>{
                    setRefresh(!refresh)
                })
            }}>add company</button>

            <p className={"text-white text-xl"}>EMPLOYEES </p>



        </div>
    )
}