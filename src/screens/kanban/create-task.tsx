import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export const CreateTask=({kanbanId}:{kanbanId:number})=>{
    // 设置task名
    const [name,setName]=useState('');
    // 添加事务
    const { mutateAsync:addTask}=useAddTask(useTasksQueryKey());
    // 获取projectId
    const projectId=useProjectIdInUrl();
    // 默认为非输入状态标志
    const [inputMode,setInputMode]=useState(false);
    // 提交添加事务
    const submit=async ()=>{
      await addTask({projectId,name,kanbanId});
      setInputMode(false);
      setName(''); 
    }
    // 输入状态取反
    const toggle=()=>setInputMode(mode=>!mode);
    useEffect(()=>{
        if(!inputMode){
            setName('')
        }
    },[inputMode])

    if(!inputMode){
        return <div onClick={toggle}>+创建事务</div>
    }

    return <Card>
        <Input onBlur={toggle} 
        placeholder={'需要做些什么'} 
        autoFocus={true}
        value={name}
        onPressEnter={submit}
        onChange={evt=>setName(evt.target.value)}
        />
    </Card>
}