import { useMemo } from "react";
import { useLocation } from "react-router"
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

// 获取url中的projectId
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];


export const useTaskSearchParams = () => {
    const [param ,setParam]=useUrlQueryParam([
        'name',
        'typeId',
        'prosessorId',
        'tagId'
    ])

    const projectId=useProjectIdInUrl();

    return useMemo(()=>({
         projectId,
         typeId:Number(param.typeId) || undefined,
         processorId:Number(param.prosessorId) || undefined,
         tagId:Number(param.tagId)||undefined,
         name:param.name
         }),[projectId,param])
};

export const useTasksQueryKey = () => ['tasks', useKanbanSearchParams()];

