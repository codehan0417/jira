import React from 'react'
import { User } from "../../types/user"
import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'

import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal, useProjectsQueryKey } from './util'
import { Project } from 'types/project'
interface ListProps extends TableProps<Project> {
    users: User[],
}
export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject(useProjectsQueryKey());
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

    return <Table rowKey={'id'} pagination={false} columns={[
        {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
            }
        },
        {
            title: '名称',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
                return <Link to={String(`projects/${project.id}`)}>{project.name}</Link>
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
            render(value, project) {
                return <More project={project} />
            }
        }
    ]} {...props} />
}



const More = ({ project }: { project: Project }) => {
    const editProject = (id: number) => () => startEdit(id)
    const { startEdit } = useProjectModal();
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: '确认删除这个项目吗？',
            content: '点击确认删除',
            okText: '确认',
            onOk() {
                deleteProject({ id })
            }
        })
    }

    return <Dropdown overlay={<Menu>
        <Menu.Item onClick={editProject(project.id)} key={'edit'}>
            编辑
        </Menu.Item>
        <Menu.Item onClick={() => confirmDeleteProject(project.id)} key={'delete'}>
            删除
        </Menu.Item>
    </Menu>}>
        <ButtonNoPadding type='link'>...</ButtonNoPadding>
    </Dropdown>
}