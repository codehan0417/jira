
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./use-optimistic-option";

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

export interface SortProps{
    // 要重新排序的item
    fromId:number,
    // 目标Item
    referenceId:number,
    // 放在目标item的前还是后
    type:'before'|'after'

    fromKanbanId?:number,
    toKanbanId?:number
}

export const useReorderKanban=(queryKey:QueryKey)=>{
    const client=useHttp();
    return useMutation(
        (params:SortProps)=>{
            return client('kanbans/reorder',{
                data:params,
                method:'POST'
            })
        },
        useReorderKanbanConfig(queryKey)
    )
}