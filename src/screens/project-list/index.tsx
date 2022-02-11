import React from 'react'
import { SearchPannel } from "./search-pannel"
import { List } from "./list"
import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from 'utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useAsync } from 'utils/use-async';
import { Project } from 'screens/project-list/list'
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

// const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {


    const [param, setParam] = useState({
        name: "",
        personId: ''
    })

    // 设置loading error
    // const [isLoading,setIsLoading]=useState(false);
    // const [error,setError]=useState<Error| null>(null)

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

const Container = styled.div`
    padding:2rem;
`


