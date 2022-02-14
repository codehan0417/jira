
import styled from "@emotion/styled";
import { Typography, List, Popover, Divider, Button } from "antd";
import React from "react";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";
export const ProjectPopover = () => {
    const { data: projects, isLoading } = useProjects();
    const {open}=useProjectModal();
    const pinnedProjexts = projects?.filter((project: { pin: any; }) => project.pin);
    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjexts?.map((project: { id: React.Key | null | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => <List.Item key={project.id}>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding onClick={open} type={'link'}>创建项目</ButtonNoPadding>
    </ContentContainer>

    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width:30rem ;
`