import React from 'react'
import { Input, Select, Form } from 'antd'
import { Project } from './list'
import { UserSelect } from 'components/use-select'

export interface User {
    id: number,
    name: string,
    personId: string,
    organization: string,
    created: string,
    token: string
}
interface SearchPannel {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>,

    setParam: (param: SearchPannel['param']) => void
}
export const SearchPannel = ({ users, param, setParam }: SearchPannel) => {




    return <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
        <Form.Item>
            <Input placeholder='项目名' type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />

        </Form.Item>
        <Form.Item>
            <UserSelect value={param.personId}
            defaultOptionName={'负责人'}
                onChange={value => setParam({
                    ...param,
                    personId: value
                })} />
        </Form.Item>
    </Form>
}