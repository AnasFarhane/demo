import React, {useEffect, useState} from 'react';
import {getAllStudents, removeStudent} from "./client";
import {
    DeleteOutlined,
    DesktopOutlined,
    EditOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './App.css'
import {
    Avatar,
    Badge,
    Breadcrumb,
    Button,
    Divider,
    Empty,
    Image,
    Layout,
    Menu,
    Popconfirm,
    Space,
    Spin,
    Table
} from 'antd';
import StudentDrawerForm from "./StudentDrawerForm";
import {openErrorServerNotification, openSuccessStudentRemovedNotification} from "./Notifications";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];
const {Header, Content, Footer, Sider} = Layout;
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);


const App = () => {

    const [students, setStudents] = useState([])

    const fetchStudents = () => getAllStudents()
        .then(res => res.json()).then(data => {
            setStudents(data)
        }).catch((error) => {
            error.response.json().then((data) => openErrorServerNotification(data.error, data.message))
        }).finally(() => {
            setFetching(false)
        })
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const TheAvatar = ({name}) => {
        let trim = name.trim()
        if (trim.length === 0) {
            return <Avatar icon={<UserOutlined/>}/>
        }
        const split = trim.split(" ")
        if (split.length === 1) {
            return <Avatar> {name.charAt(0)}</Avatar>
        }
        return <Avatar>{name.charAt(0) + name.charAt(name.length - 1)}</Avatar>
    }
    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, student) => <TheAvatar name={student.name}/>
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, student) =>
                <Button.Group>
                    <Button icon={<EditOutlined/>}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => onDelete(student.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined/>}>Delete</Button>
                    </Popconfirm>
                </Button.Group>
        },
    ];

    const onDelete = id => {
        removeStudent(id).then(() => {
            openSuccessStudentRemovedNotification()
        }).catch((error) => {
            error.response.json().then((data) => openErrorServerNotification(data.error, data.message))
        }).finally(() => {
            fetchStudents()
        })
    }

    useEffect(() => {
        fetchStudents()
    }, [])
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            {
                                fetching ? <Spin indicator={antIcon}/> :
                                    students.length <= 0 ?
                                        <>
                                            <Button type="primary" shape="round" onClick={showDrawer}
                                                    icon={<UserAddOutlined/>} size='medium'>
                                                Add new Student
                                            </Button>
                                            <Divider/>
                                            <Empty/>
                                        </> :
                                        <Table dataSource={students}
                                               columns={columns}
                                               bordered
                                               title={() =>
                                                   <Space>
                                                       <Button type="primary" shape="round" onClick={showDrawer}
                                                               icon={<UserAddOutlined/>} size='medium'>
                                                           Add new Student
                                                       </Button>
                                                       <Badge
                                                           className="site-badge-count-109 "
                                                           count={students.length}
                                                           style={{backgroundColor: '#52c41a'}}
                                                       />
                                                   </Space>
                                               }
                                               pagination={{pageSize: 100}}
                                               scroll={{y: 340}}
                                               rowKey={(student) => student.id}
                                        />
                            }

                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <Image width={75} src="https://user-images.githubusercontent.com/76697224/186748018-1eb3f184-ca53-4323-b2b3-7480b7da37b8.jpg"/>
                    <Divider>
                        <a target="_blank" rel={"noreferrer"} href="https://github.com/AnasFarhane/demo">Click here to access GitHub link</a>
                    </Divider>
                    </Footer>
                </Layout>
            </Layout>
            <StudentDrawerForm visible={visible} setVisible={setVisible} fetchStudents={fetchStudents}/>
        </>
    );
};

export default App;