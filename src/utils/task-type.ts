
import { useHttp } from "./http";
import { useQuery } from "react-query";

import { TaskType } from "types/task-type";
// 获取TaskType列表
export const useTaskTypes = () => {
    const client = useHttp();
    return useQuery<TaskType[]>(['taskTypes'], () => 
    client('taskTypes')
    );
}