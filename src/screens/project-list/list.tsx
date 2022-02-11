import React from 'react'
import { User } from './search-pannel'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created:number
}
interface ListProps extends TableProps<Project>{
    users: User[]
}
export const List = ({users,...props}: ListProps) => {
    return <Table rowKey={'str'}  pagination={false} columns={[
        {
            title: '名称',
            dataIndex:'name',
            sorter:(a,b)=>a.name.localeCompare(b.name)
        },
        {
            title: '部门',
            dataIndex:'organization',
        },
        {
            title:'负责人',
            render(_,item){
                return <span key={item.id}>
                    {users.find(user => user.id === item.personId)?.name || "未知"}
                </span>
            }
        },
        {
            title:'创建时间',
            render(_,project){
                return <span key={project.id}>
                    {project.created? dayjs(project.created).format('YYYY-MM-DD'):'无'}
                </span>
            }

        }
    ]} {...props} />
}