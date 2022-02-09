import React from 'react'
export interface User{
    id: string,
    name: string,
    personId: string,
    organization: string,
    created: string,
    token:string
}
interface SearchPannel{
    users:User[],
    param:{
        name:string,
        personId:string
    },
    setParam:(param:SearchPannel['param'])=>void
}
export const SearchPannel = ({users,param,setParam}:SearchPannel) => {

    
    
    
    return <form action="">
        <div>
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />

            <select value={param.personId} onChange={evt=>setParam({
                ...param,
                personId:evt.target.value
            })}>
                <option value={''}>负责人</option>
                {
                    users.map(user=>{
                        return <option key={user.id} value={user.id}>{user.name}</option>
                    })
                }
            </select>
        </div>
    </form>
}