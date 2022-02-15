import React from 'react'
import { Kanban } from 'types/kanban'
import { useTask, useTasks } from 'utils/task'
import { useKanbansQueryKey, useTaskSearchParams, useTasksModal } from './util';
import taskIcon from 'assets/task.png'
import bugIcon from 'assets/bug.png'
import { useTaskTypes } from 'utils/task-type';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import { CreateTask } from './create-task';
import { Task } from 'types/task';
import { Mark } from 'components/mark';
import { useDeleteKanban, useKanbans } from 'utils/kanban';
import { Row } from 'components/lib';

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



    return <Container>
        <Row between={true}>
            <h3>{kanban.name}</h3>
            <More kanban={kanban}/>
        </Row>
        <TasksContainer>
            {
                tasks?.map(task => <TaskCard key={task.id} task={task} />)
            }
            <CreateTask kanbanId={kanban.id} />
        </TasksContainer>
    </Container>
}

const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModal()
    const { name: keyword } = useTaskSearchParams();
    return (<Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
        <p>
            <Mark keyword={keyword} name={task.name} />
        </p>
        <TaskTypeIcon id={task.typeId} />
    </Card>)
}


const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
    const startEdit = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除看板吗',
            onOk() {
                return mutateAsync({ id: kanban.id })
            }
        })
    }
    const overLay = <Menu>
        <Menu.Item>
            <Button type='link' onClick={startEdit}>删除</Button>
        </Menu.Item>
    </Menu>
    return <Dropdown overlay={overLay}>
        <Button type={'link'}>...</Button>
    </Dropdown>
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

const TasksContainer = styled.div`
    overflow: scroll;
    flex:1;
    ::-webkit-scrollbar{
        display: none;
    }
`