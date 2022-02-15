
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-option";

// 获取project列表
export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp();
    return useQuery<Kanban[]>(['kanbans', param], () =>
        client('kanbans', { data: param })
    );
}

// 添加看板
export const useAddKanban = (queryKey:QueryKey) => {
    const client = useHttp();
    return useMutation((params: Partial<Kanban>) =>
        client(`kanbans`, {
            data: params,
            method: 'POST'
        }),
        useAddConfig(queryKey)
    )
   
}

// 删除看板
export const useDeleteKanban = (queryKey:QueryKey) => {
    const client = useHttp();
    return useMutation(({id}:{id:number}) =>
        client(`kanbans/${id}`, {
            method: 'DELETE'
        }),
        useDeleteConfig(queryKey)
    )
   
}