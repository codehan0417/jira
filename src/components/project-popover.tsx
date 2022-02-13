
import styled from "@emotion/styled";
import { Typography, List, Popover, Divider, Button } from "antd";
import React from "react";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";
export const ProjectPopover = (props:{setProjecttModalOpen:(isOpen:boolean)=>void}) => {
    const {data:projects,isLoading} =useProjects();

    const pinnedProjexts=projects?.filter(project=>project.pin);
    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjexts?.map(project=><List.Item key={project.id}>
                    <List.Item.Meta  title={project.name}/>
                </List.Item>)
            }
        </List>
        <Divider/>
        <ButtonNoPadding type="link" onClick={()=>props.setProjecttModalOpen(true)}>创建项目</ButtonNoPadding>
    </ContentContainer>

    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}

const ContentContainer=styled.div`
    min-width:30rem ;
`