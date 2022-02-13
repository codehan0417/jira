import React from 'react'
import { User } from './search-pannel'
import { Dropdown, Menu, Table, TableProps } from 'antd'
import dayjs from 'dayjs'

import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number
}
interface ListProps extends TableProps<Project> {
    users: User[],
    setProjecttModalOpen:(isOpen:boolean)=>void
}
export const List = ({ users, ...props }: ListProps) => {
    const {mutate}=useEditProject();
    const pinProject=(id:number)=>(pin:boolean)=>mutate({id,pin})
    return <Table rowKey={'id'} pagination={false} columns={[
        {
            title:<Pin checked={true} disabled={true} />,
            render(value,project){
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
             }
        },
        {
            title: '名称',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization',
        },
        {
            title: '负责人',
            render(_, item) {
                return <span key={item.id}>
                    {users.find(user => user.id === item.personId)?.name || "未知"}
                </span>
            }
        },
        {
            title: '创建时间',
            render(_, project) {
                return <span key={project.id}>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                </span>
            }

        },
        {
            render(value,project){
                return <Dropdown overlay={<Menu>
                    <Menu.Item key={'edit'}>
                        <ButtonNoPadding type='link' onClick={()=>props.setProjecttModalOpen(true)}>编辑</ButtonNoPadding>
                    </Menu.Item>
                </Menu>}>
                    <ButtonNoPadding type='link'>...</ButtonNoPadding>
                </Dropdown>
            }
        }
    ]} {...props} />
}