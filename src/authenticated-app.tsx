import { useAuth } from "context/auth-context"
import React from "react"
import { ProjectListScreen } from "screens/project-list"
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd";
import { useDocumnetTitle } from "utils";

import { Navigate, Route, Routes } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import { ProjectScreen } from "screens/project";

export const AuthenticatedApp = () => {
    useDocumnetTitle('项目列表', false)
    return (
        <Container>
            <PageHeader />
            <Main>
                <ProjectListScreen />
                <Router>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectListScreen />}></Route>
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                    </Routes>
                </Router>
            </Main>
        </Container>
    );
}

const PageHeader = () => {
    const { logout, user } = useAuth();
    return <Header between={true}>
        <HeaderLeft gap={true}>
            <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
            <h3>项目</h3>
            <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown overlay={
                <Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={'link'} onClick={logout}>登出</Button>
                    </Menu.Item>
                </Menu>
            }>
                <Button type={'link'} onClick={e => e.preventDefault()}>
                    Hi,{user?.name}
                </Button>
            </Dropdown>
        </HeaderRight>
    </Header>
}

const Container = styled.div`
    display:grid;
    grid-template-rows:6rem 1fr;
    height:100vh;
`

const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``


const Header = styled(Row)`
    padding:2rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    z-index:1;
`
const Main = styled.main``

