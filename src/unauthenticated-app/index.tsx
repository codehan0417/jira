import { useState } from "react"
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Card, Divider,Button } from 'antd'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <Cotainer>
           <Header/>
            <ShadowCard>
                <Title>
                    {isRegister?"请注册":"请登录"}
                </Title>
                {
                    isRegister ? <RegisterScreen /> : <LoginScreen />
                }
                <Divider/>
                <a onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已经有账号了？直接登录' : '没有账号? 注册新账号'}</a>
            </ShadowCard>
            <Background/>
        </Cotainer>
    )
}
export const LongButton=styled(Button)`
    width:100%;
`

const Title=styled.h2`
    margin-bottom:2rem;
    color:rgb(94,108,132);
`

const Background=styled.div`
    position:absolute;
    z-index:-1;
    width:100%;
    height:100%;
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-position:left bottom,right bottom;
    background-size:calc(((100vw - 35rem)/2) - 3.2rem),calc(((100vw - 35rem)/2) - 3.2rem),cover;
    background-image:url(${left}),url(${right});
`

const Header=styled.header`
    background:url(${logo}) no-repeat center;
    padding:5rem 0;
    background-size:8rem;
    width:100%;

`
const ShadowCard=styled(Card)`
    width:35rem;
    min-height:30rem;
    padding:3.2rem 4rem;
    border-radius:0.3rem;
    box-sizing:border-box;
    box-shadow:rgba(0,0,0,0.1) 0 0 10px;
    text-align:center;

`

const Cotainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
min-height:100vh;
`