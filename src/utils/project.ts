import { Project } from "screens/project-list/list";
import { useAsync } from "./use-async"
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-option";

// 获取project列表
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    return useQuery(['projects', param], () => client('projects', { data: param }))
}

// 编辑项目  收藏
export const useEditProject = (querykey:QueryKey) => {
    // useMutation
    const client = useHttp();
    const queryClient=useQueryClient();

    const [searchParams]=useProjectsSearchParams()
    const queryKey=['projects',searchParams]
    return useMutation((params: Partial<Project>) =>
        client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }),
        useEditConfig(queryKey)
    )

}
// 添加项目 
export const useAddProject = (queryKey:QueryKey) => {
    const client = useHttp();
    const queryClient=useQueryClient()
    return useMutation((params: Partial<Project>) =>
        client(`projects`, {
            data: params,
            method: 'POST'
        }),
        useAddConfig(queryKey)
    )
   
}
// 删除项目
export const useDeleteProject = (queryKey:QueryKey) => {
    const client = useHttp();
    return useMutation(({id}:{id:number}) =>
        client(`projects/${id}`, {
            method: 'DELETE'
        }),
        useDeleteConfig(queryKey)
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