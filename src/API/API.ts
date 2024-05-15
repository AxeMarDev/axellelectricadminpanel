
export type tProject = {id:string, name:string, location:string, imageurl:string}
export type tPeople = [tProject] | [];


const GET = async ( route:string, params:Record<string, string> ) =>{

    let value : { resp : tPeople } = {resp: []}

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

const POST = async ( route:string, params:Record<string, string>, data:BodyInit ) =>{

    let value : { resp : tPeople } = {resp: []}

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

    let value : { resp : tPeople } = {resp: []}

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

const deleteProject = async (id:string) =>{
    return DELETE( "/projects",{id: id}, "")
}
const   getProjects = async () =>{

    return GET( "/projects",{})

}

const   addProjects = async (param:tProject) =>{

    return POST( "/projects",{}, JSON.stringify(param))

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

}