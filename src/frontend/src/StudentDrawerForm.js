import {Button, Col, Drawer, Form, Input, notification, Row, Select, Space, Spin} from "antd";
import {Option} from "antd/es/mentions";
import React, {useState} from "react";

import {addNewStudent} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {
    openErrorServerNotification,
    openFailedStudentAddedNotification,
    openSuccessStudentAddedNotification
} from "./Notifications";



const StudentDrawerForm = ({visible, setVisible, fetchStudents}) => {
    const onClose = () => {
        formRef.resetFields();
        setVisible(false);
    };

    const [formRef] = Form.useForm()

    const [submitting, setSubmitting] = useState(false)

    const onFinish = async values => {
        setSubmitting(true)
        await addNewStudent(values).then(()=>{
            openSuccessStudentAddedNotification()
        }).catch((error)=>{
            console.log(error.response.json())
            error.response.json().then((data)=> openErrorServerNotification(data.error, data.message))
        }).finally(()=>{
            fetchStudents()
            onClose()
            setSubmitting(false)
        })
    };

    return <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
            paddingBottom: 80,
        }}
    >
        <Form layout="vertical" name="control-hooks" form={formRef} onFinish={onFinish}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {

                                required: true,
                                message: 'Please write your name',
                            },
                        ]}
                    >
                        <Input placeholder={"Please enter student name"}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: 'Please write your email',
                            },
                        ]}
                    >
                        <Input placeholder={"Please enter student email"}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose student gender',
                            },
                        ]}
                    >
                        <Select placeholder="Please choose student gender">
                            <Option value="MALE">Male</Option>
                            <Option value="FEMALE">Female</Option>
                            <Option value="OTHER">Other</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Space>
                <Button htmlType="submit" type="primary">Submit</Button>
                <Button onClick={onClose}>Cancel</Button>
            </Space>
            <Row>
                {
                    submitting && <Spin indicator={antIcon} />
                }
            </Row>
        </Form>
    </Drawer>
}
export default StudentDrawerForm

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);