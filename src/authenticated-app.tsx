import { useAuth } from "context/auth-context"
import React from "react"
import { ProjectListScreen } from "screens/project-list"
import styled from "@emotion/styled";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <h3>logo</h3>
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={logout}>登出</button>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen></ProjectListScreen>
            </Main>
        </Container>
    );
}

const Container = styled.div`
    display:grid;
    grid-template-rows:6rem 1fr;
    height:100vh;
`

const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``


const Header = styled(Row)``
const Main = styled.main``

