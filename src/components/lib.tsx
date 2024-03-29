import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";


export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number
}>
    `
    display:flex;
    align-items:center;
    justify-content:${props => props.between ? "space-between" : undefined};
    margin-bottom:${props => props.marginBottom + 'rem'};
    >*{
        margin-top:0 !important;
        margin-bottom:0 !important;
        margin-right:${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined}
    }
`

const FullPage=styled.div`
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

// 页面加载组件
export const FullPageLoading=()=><FullPage>
    <Spin size={'large'}/>
</FullPage>


// 页面出错error组件
export const FullPageErrorFallback=({error}:{error:Error | null})=><FullPage>
    <DevTools/>
    <ErrorBox error={error}/>
</FullPage>

// 内边距为0的button
export const ButtonNoPadding=styled(Button)`
    padding: 0;
`
// 类型守卫
const isError=(value:any):value is Error=>value?.message;
// 传入任意类型，
export const ErrorBox=({error}:{error:unknown})=>{
    if(isError(error)){
        return <Typography.Text type={'danger'}>{error.message}</Typography.Text>
    }
    return null
}


export const ScreenContainer=styled.div`
    padding: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`