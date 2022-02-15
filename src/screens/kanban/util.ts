import { useCallback, useMemo } from "react";
import { useLocation } from "react-router"
import { useDebounce } from "utils";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
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
    const [param, setParam] = useUrlQueryParam([
        'name',
        'typeId',
        'prosessorId',
        'tagId'
    ])


    const projectId = useProjectIdInUrl();
    const debounceName = useDebounce(param.name, 200)

    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.prosessorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: debounceName
    }), [projectId, param])
};

export const useTasksQueryKey = () => ['tasks', useKanbanSearchParams()];



export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
    // 获取task详情
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
    // 开启模态框
    const startEdit = useCallback((id: number) => {
        setEditingTaskId({ editingTaskId: id })
    }, [setEditingTaskId])
    // 关闭模态框
    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: '' })
    }, [setEditingTaskId])

    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
}