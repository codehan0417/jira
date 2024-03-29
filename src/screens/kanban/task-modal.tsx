import { Modal, Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTasksModal, useTasksQueryKey } from "./util";
import { UserSelect } from "components/use-select";
import { TaskTypeSelect } from "components/task-type-select";


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

// 模态框task
export const TaskModal = () => {
    const [form] = Form.useForm();
    const { editingTaskId, editingTask, close } = useTasksModal()

    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey());

    const {mutate:deleteTask}=useDeleteTask(useTasksQueryKey());
    const onCancel = () => {
        close();
        form.resetFields();
    }

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() })
        close();
    }

    const startDelete=()=>{
        close();
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除任务吗',
            onOk() {
                return deleteTask({ id: Number(editingTaskId)})
            }
        })
    }

    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])

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
                rules={[{ required: true, message: '请输入任务名' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label={'经办人'} name={'processorId'}>
                <UserSelect defaultOptionName={"经办人"} />
            </Form.Item>
            <Form.Item label={'类型'} name={'typeId'}>
                <TaskTypeSelect />
            </Form.Item>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={startDelete} style={{fontSize:'14px'}} size={'small'} >删除</Button>
            </div>
        </Form>
    </Modal>
}