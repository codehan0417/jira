
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./use-optimistic-option";

// 获取任务组列表
export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp();
    return useQuery<Epic[]>(['epics', param], () =>
        client('epics', { data: param })
    );
}

// 添加epic
export const useAddEpic = (queryKey:QueryKey) => {
    const client = useHttp();
    return useMutation((params: Partial<Epic>) =>
        client(`epics`, {
            data: params,
            method: 'POST'
        }),
        useAddConfig(queryKey)
    )
   
}

// 删除任务组
export const useDeleteEpic = (queryKey:QueryKey) => {
    const client = useHttp();
    return useMutation(({id}:{id:number}) =>
        client(`epics/${id}`, {
            method: 'DELETE'
        }),
        useDeleteConfig(queryKey)
    )
   
}
