import React, { useState } from "react"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd";
import { resetRoute, useDocumnetTitle } from "utils";

import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import { ProjectScreen } from "screens/project";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";
import { UserPopover } from "components/user-popover";

export const AuthenticatedApp = () => {
    useDocumnetTitle('项目列表', false)
    return (
        <Container>
            <Router>
                <PageHeader />
                <Main>
                    <Routes>
                        <Route
                            path={'/projects'}
                            element={<ProjectListScreen />}></Route>
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                        {/* <Route path={'/'} element={<Navigate to={'/projects'}/>}></Route> */}
                        <Route index
                            element={
                                <ProjectListScreen />}></Route>
                    </Routes>
                </Main>
                <ProjectModal />
            </Router>
        </Container>
    );
}

const PageHeader = () => {

    return <Header between={true}>
        <HeaderLeft gap={true}>
            <ButtonNoPadding type={'link'} onClick={resetRoute}>
                <SoftwareLogo width={'18rem'} height={'2rem'} color={'rgb(38,132,255)'} />
            </ButtonNoPadding>
            <ProjectPopover />
            <UserPopover />
        </HeaderLeft>
        <HeaderRight>
            <User />
        </HeaderRight>
    </Header>
}

const User = () => {
    const { logout, user } = useAuth();
    return <Dropdown overlay={
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
const Main = styled.main`
    /* width: 100%; */
    display: flex;
    overflow: hidden;
`

