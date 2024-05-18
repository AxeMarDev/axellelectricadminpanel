
export type tProject = {id:string, name:string, location:string, imageurl:string, date:string}
export type tProjects = [tProject] | [];
export type tMessage = {id:string, email:string, name:string, location:string, message:string,read:boolean}
export type tMessages = [tMessage] | []
export type tCompany = {id:string, company_name:string}
export type tEmployee = {id:string, company_id:string,first_name:string, last_name:string, email:string, is_master:boolean }


const GET = async <type>( route:string, params:Record<string, string> ) =>{

    let value : { resp : type } = {resp: <type>[]}

    const queryParams = new URLSearchParams(params);

    const url = `http://localhost:8080${route}?${queryParams}`;

    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response)=> response.json() )
        .then((data) => {
            if ( data.error){
                console.log(data.error)

                value = { resp: <type>[] }
            } else{
                console.log(data)
                value = { resp: data }
            }

        })
        .catch((error) => {
            console.error(error);
            value = { resp: <type>[] }
        });


    return value
}

const POST = async <type> ( route:string, params:Record<string, string>, data:BodyInit ) =>{

    let value : { resp : type } = {resp: <type> []}

    const queryParams = new URLSearchParams(params);

    const url = `http://localhost:8080${route}?${queryParams}`;

    console.log(url)

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            console.log(data.error)
            if ( data.error){
                value = { resp: <type>[] }
            } else{
                value = { resp: data }
            }

        })
        .catch((error) => {
            console.error(error);
            value = { resp: <type>[] }
        });


    return value
}

const DELETE = async ( route:string, params:Record<string, string>, data:BodyInit) =>{

    let value : { resp : tProjects } = {resp: []}

    const queryParams = new URLSearchParams(params)

    const url = `http://localhost:8080${route}?${queryParams}`;

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            value = { resp: data }
        })
        .catch((error) => {
            console.error(error);
        });


    return value
}

const PATCH = async ( route:string, params:Record<string, string>, data:BodyInit) =>{

    let value : { resp : tProjects } = {resp: []}

    const queryParams = new URLSearchParams(params)

    const url = `http://localhost:8080${route}?${queryParams}`;

    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            value = { resp: data }
        })
        .catch((error) => {
            console.error(error);
        });


    return value
}

const deleteProject = async (id:string) =>{
    return DELETE( "/projects",{id: id}, "")
}
const   getProjects = async () =>{

    return GET<tProjects>( "/projects",{})

}

const   addProjects = async (param:tProject) =>{

    return POST( "/projects",{}, JSON.stringify(param))

}

const updateProject = async( param:tProject) =>{
    return PATCH("/projects", {id:param.id}, JSON.stringify(param))
}

const   getMessages = async () =>{

    return GET<tMessages>( "/messages",{})

}

const updateMessage = async( param:tMessage )=>{
    return PATCH("/messages", {id:param.id}, JSON.stringify(param))
}

const   getCompanies = async () =>{

    return GET<tCompany[]>( "/companies",{})

}

const  addCompany = async (param:tCompany &  { username:string , email:string}) =>{
    console.log(param)
    return POST<tCompany>( "/companies",{}, JSON.stringify(param))

}

const   getEmployees = async () =>{

    return GET<tEmployee[]>( "/employees",{})

}



export {getProjects}

export default class API{

    static getProjects(){
        return getProjects()
    }
    static addProjects( param:tProject){
        return addProjects(param)
    }

    static deleteProjects( id:string){
        return deleteProject(id)
    }

    static getMessages(){
        return getMessages()
    }
    static updateProject(param:tProject){
        return updateProject(param)
    }

    static updateMessage(param:tMessage){
        return updateMessage(param)
    }

    static getCompanies(){
        return getCompanies()
    }

    static addCompany(param:tCompany & { username:string , email:string}){
        return addCompany(param)
    }

    static getEmployees(){
        return getEmployees()
    }
}
