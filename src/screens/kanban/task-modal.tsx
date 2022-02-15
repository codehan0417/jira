import {Modal,Form, Input} from "antd";
import React, { useEffect } from "react";
import { useEditTask } from "utils/task";
import { useTasksModal, useTasksQueryKey } from "./util";
import { UserSelect } from "components/use-select";
import { TaskTypeSelect } from "components/task-type-select";


const layout={
    labelCol:{span:8},
    wrapperCol:{span:16}
}

// 模态框task
export const TaskModal = () => {
    const [form]=Form.useForm();
    const {editingTaskId,editingTask,close}=useTasksModal()

    const {mutateAsync:editTask,isLoading:editLoading}=useEditTask(useTasksQueryKey());

    const onCancel=()=>{
        close();
        form.resetFields();
    }

    const onOk=async ()=>{
        await editTask({...editingTask,...form.getFieldsValue()})
        close();
    }
    
    useEffect(()=>{
        form.setFieldsValue(editingTask)
    },[form,editingTask])

    return <Modal 
    okText={'确认'}
    cancelText={'取消'}
    confirmLoading={editLoading}
    title={'编辑任务'}
    visible={!!editingTaskId}
    forceRender={true}
    onCancel={onCancel}
    onOk={onOk}
    
    >
    <Form  {...layout} initialValues={editingTask} form={form}>
        <Form.Item label={'任务名'} name={'name'}
        rules={[{required:true,message:'请输入任务名'}]}
        >
            <Input/>
        </Form.Item>
        <Form.Item label={'经办人'} name={'processorId'}>
            <UserSelect defaultOptionName={"经办人"}/>
        </Form.Item>
        <Form.Item label={'类型'} name={'typeId'}>
           <TaskTypeSelect />
        </Form.Item>
    </Form>
    </Modal>
}