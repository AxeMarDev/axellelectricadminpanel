
export type tProject = {id:string, name:string, location:string, imageurl:string, date:string}
export type tProjects = [tProject] | [];
export type tMessage = {id:string, email:string, name:string, location:string, message:string,read:false}
export type tMessages = [tMessage] | []



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

const POST = async ( route:string, params:Record<string, string>, data:BodyInit ) =>{

    let value : { resp : tProjects } = {resp: []}

    const queryParams = new URLSearchParams(params);

    const url = `http://localhost:8080${route}?${queryParams}`;

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
                value = { resp: [] }
            } else{
                value = { resp: data }
            }

        })
        .catch((error) => {
            console.error(error);
            value = { resp: [] }
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
}