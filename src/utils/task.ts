
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useAddConfig } from "./use-optimistic-option";
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