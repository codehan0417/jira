import { Project } from "screens/project-list/list";
import { useAsync } from "./use-async"
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

// 获取project列表
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    return useQuery(['projects', param], () => client('projects', { data: param }))
}

// 编辑项目
export const useEditProject = () => {
    // useMutation
    const client = useHttp();
    const queryClient=useQueryClient();
    return useMutation((params: Partial<Project>) =>
        client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }),{
            onSuccess:()=>queryClient.invalidateQueries('projects')
        }
    )

}
// 
export const useAddProject = () => {
    const client = useHttp();
    const queryClient=useQueryClient()
    return useMutation((params: Partial<Project>) =>
        client(`projects`, {
            data: params,
            method: 'POST'
        }),{
            onSuccess:()=>queryClient.invalidateQueries('projects')
        }
    )
   
}

// 获取projects的详情
export const useProject=(id?:number)=>{
    const client=useHttp();
    return useQuery<Project>(
        ['projects',{id}],
        ()=>client(`projects/${id}`),
        {
            enabled:!!id
        }
    )
}