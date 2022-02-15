import React from 'react'
import { Kanban } from 'types/kanban'
import { useTask, useTasks } from 'utils/task'
import { useTaskSearchParams, useTasksModal } from './util';
import taskIcon from 'assets/task.png'
import bugIcon from 'assets/bug.png'
import { useTaskTypes } from 'utils/task-type';
import styled from '@emotion/styled';
import { Card } from 'antd';
import { CreateTask } from './create-task';

const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType: { id: number; }) => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return <img alt='taskIcon' src={name === 'task' ? taskIcon : bugIcon} />
}


export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: alltasks } = useTasks(useTaskSearchParams());
    const tasks = alltasks?.filter(task => task.kanbanId === kanban.id)

    const {startEdit}=useTasksModal()

    return <Container>
        <h3>{kanban.name}</h3>
        <TasksContainer>
            {
                tasks?.map(task => <Card key={task.id} onClick={()=>startEdit(task.id)} style={{ marginBottom: '0.5rem',cursor:'pointer' }}>
                    <div>
                        {task.name}
                    </div>
                    <TaskTypeIcon id={task.typeId} />
                </Card>)
            }
            <CreateTask kanbanId={kanban.id}/>
        </TasksContainer>
    </Container>
}


export const Container = styled.div`
    min-width: 15rem;
    border-radius: 6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
    

`

const TasksContainer=styled.div`
    overflow: scroll;
    flex:1;
    ::-webkit-scrollbar{
        display: none;
    }
`