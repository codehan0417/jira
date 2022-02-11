import React from 'react'
import { Input, Select, Form } from 'antd'

export interface User {
    id: string,
    name: string,
    personId: string,
    organization: string,
    created: string,
    token: string
}
interface SearchPannel {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPannel['param']) => void
}
export const SearchPannel = ({ users, param, setParam }: SearchPannel) => {




    return <Form style={{marginBottom:'2rem'}} layout={'inline'}>
        <Form.Item>
            <Input placeholder='项目名' type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />

        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value={''}>负责人</Select.Option>
                {
                    users.map(user => {
                        return <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                    })
                }
            </Select>
        </Form.Item>
    </Form>
}