import React from 'react'
import { SearchPannel } from "./search-pannel"
import { List } from "./list"
import { useState,useEffect } from "react";
import { cleanObject,useMount,useDebounce } from 'utils';


import * as qs from 'qs'
const apiUrl=process.env.REACT_APP_API_URL;
export const ProjectListScreen=()=>{
    const [list,setList]=useState([]);
    const [users,setUsers]=useState([]);
    const [param, setParam] = useState({
        name:"",
        personId: ''
    })
    const debounce=useDebounce(param,2000);
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounce))}`).then(async response=>{
            if(response.ok){
                setList(await response.json());
            }
        })
    },[debounce])

    useMount(()=>{
        fetch(`${apiUrl}/users`).then(async response=>{
            if(response.ok){
                setUsers(await response.json());   
            }
        })
    })
    return <div>
        <SearchPannel users={users} param={param} setParam={setParam}/>
        <List list={list} users={users}/>
    </div>
}
