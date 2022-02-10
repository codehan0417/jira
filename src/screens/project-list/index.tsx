import React from 'react'
import { SearchPannel } from "./search-pannel"
import { List } from "./list"
import { useState,useEffect } from "react";
import { cleanObject,useMount,useDebounce } from 'utils';
import { useHttp } from 'utils/http';
const apiUrl=process.env.REACT_APP_API_URL;
export const ProjectListScreen=()=>{
    const [list,setList]=useState([]);
    const [users,setUsers]=useState([]);
    const [param, setParam] = useState({
        name:"",
        personId: ''
    })
    const debounce=useDebounce(param,2000);
    const client=useHttp();
    useEffect(()=>{
       client('projects',{data:cleanObject(debounce)}).then(setList);
    },[debounce])

    useMount(()=>{
        client('users').then(setUsers);
        // fetch(`${apiUrl}/users`).then(async response=>{
        //     if(response.ok){
        //         setUsers(await response.json());   
        //     }
        // })
    })
    return <div>
        <SearchPannel users={users} param={param} setParam={setParam}/>
        <List list={list} users={users}/>
    </div>
}
