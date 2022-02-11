import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react"

import { Form, Input } from 'antd'
import { LongButton } from "unauthenticated-app";
const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    // const login = (param:{username:string,password:string})=>{
    //     fetch(`${apiUrl}/login`,{
    //         method:"POST",
    //         headers:{
    //             "Content-Type":'application/json'
    //         },
    //         body:JSON.stringify(param)
    //     }).then(async response=>{
    //         if(response.ok){

    //         }
    //     })
    // }
    const { login, user } = useAuth()
    const handleSubmit = (values: { username: string, password: string }) => {

        login(values).catch(onError);

    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'}
                rules={[
                    {
                        required: true,
                        message: '请输入用户名'
                    }
                ]}
            >
                <Input placeholder={'用户名'} type="text" id={'username'} />
            </Form.Item>
            <Form.Item name={'password'}
                rules={[
                    {
                        required: true,
                        message: '请输入密码'
                    }
                ]}
            >
                <Input placeholder={'密码'} type="password" id={'password'} />
            </Form.Item>
            <Form.Item >
                <LongButton htmlType={'submit'} type={'primary'}>登录</LongButton>
            </Form.Item>
        </Form>)
}