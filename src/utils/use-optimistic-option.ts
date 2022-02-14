import { QueryKey, useQueryClient } from "react-query";

export const useConfig=(queryKey:QueryKey,callback:(target:any,old?:any[])=>any[])=>{
    const queryClient=useQueryClient();
    return {
        onSuccess:()=>queryClient.invalidateQueries(queryKey),
        async onMutate(target:any){
            // 获取queryKey对应的数据
            const previousItems=queryClient.getQueryData(queryKey);
            // 在缓存中
            queryClient.setQueryData(queryKey,(old?:any[])=>{
                return callback(target,old);
            })
            return {previousItems}
        },
        // 回滚
        onError(error:any,newItem:any,context:any){
            queryClient.setQueryData(queryKey,context.previousItems)
        }
    }
}


export const useDeleteConfig=(queryKey:QueryKey)=>useConfig(queryKey,(target,old)=>old?.filter(item=>item.id!==target.id)||[]);
export const useEditConfig=(queryKey:QueryKey)=>useConfig(queryKey,(target,old)=>old?.map(item=>item.id===target.id?{...item,...target}:item)||[]);
export const useAddConfig=(queryKey:QueryKey)=>useConfig(queryKey,(target,old)=>old?[...old,target]:[]);