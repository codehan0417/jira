import { Project } from "screens/project-list/list";
import { useAsync } from "./use-async"
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";


export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();
    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }))
    }, [param])

    return result
}

export const useEditProject = () => {
    const {run,...asyncResult} =useAsync();
    const client=useHttp();
    const mutate=(params:Partial<Project>)=>{
        run(client(`projects/${params.id}`,{
            data:params,
            method:'PATCH'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}
export const useAddProject = () => {
    const {run,...asyncResult} =useAsync();
    const client=useHttp();
    const mutate=(params:Partial<Project>)=>{
        run(client(`projects/${params.id}`,{
            data:params,
            method:'POST'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}