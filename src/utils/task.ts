
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Task } from "types/task";
// 获取project列表
export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    return useQuery<Task[]>(['tasks', param], () => 
    client('tasks', { data: param })
    );
}