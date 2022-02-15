
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-option";
// 获取project列表
export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    return useQuery<Task[]>(['tasks', param], () => 
    client('tasks', { data: param })
    );
}

// 添加任务
export const useAddTask = (queryKey:QueryKey) => {
    const client = useHttp();
    return useMutation((params: Partial<Task>) =>
        client(`tasks`, {
            data: params,
            method: 'POST'
        }),
        useAddConfig(queryKey)
    )
   
}
// 获取task详情
export const useTask=(id?:number)=>{
    const client=useHttp();
    return useQuery<Task>(
        ['tasks',{id}],
        ()=>client(`tasks/${id}`),
        {
            enabled:!!id
        }
    )
}

// 编辑task事务
export const useEditTask = (queryKey:QueryKey) => {
    // useMutation
    const client = useHttp();
    return useMutation((params: Partial<Task>) =>
        client(`tasks/${params.id}`, {
            data: params,
            method: 'PATCH'
        }),
        useEditConfig(queryKey)
    )

}

// 删除task
export const useDeleteTask = (queryKey:QueryKey) => {
    const client = useHttp();
    return useMutation(({id}:{id:number}) =>
        client(`tasks/${id}`, {
            method: 'DELETE'
        }),
        useDeleteConfig(queryKey)
    )
   
}