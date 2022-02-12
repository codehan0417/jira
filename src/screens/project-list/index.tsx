import React from 'react'
import { SearchPannel } from "./search-pannel"
import { List } from "./list"
import {  useDebounce } from 'utils';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectsSearchParams } from './util';

// const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {

// 基本类型，可以放到依赖中，组件状态可以放到依赖中，非组件状态的对象，绝不可以放到依赖中

    // 设置loading error
    // const [isLoading,setIsLoading]=useState(false);
    // const [error,setError]=useState<Error| null>(null)

    const [param,setParam]=useProjectsSearchParams();

    const debounce = useDebounce(param, 500);

    const { isLoading, error, data: list } = useProjects(debounce);
    const { data: users } = useUsers()
    return <Container>
        <h1>项目列表</h1>
        <SearchPannel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} dataSource={list || []} users={users||[]} />
    </Container>
};

ProjectListScreen.whyDidYouRender=true;

const Container = styled.div`
    padding:2rem;
`


