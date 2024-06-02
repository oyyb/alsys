import { Button, Form, FormProps, Image, Input, Modal, Space, Table, TableProps, message } from "antd";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";
import { useState } from "react";
// import { OrganizerParamsType, organizerApi } from "../../api/organizer-api";
import { OgmanagerParamsType, ogmanagerApi } from "../../api/ogmanager-api";

const Manager = () => {
    const columns: TableProps<BaseResultType.GetallogsType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left'
        },
        {
            title: '管理员用户名',
            dataIndex: 'Username',
            key: 'Username',
        },
        {
            title: '管理员昵称名',
            dataIndex: 'Nickname',
            key: 'Nickname',
        },
        {
            title: '赛事方信息',
            dataIndex: 'Info',
            key: 'Info',
        },
        {
            title: '位置',
            dataIndex: 'Pos',
            key: 'Pos',
        },
        {
            title: '联系方式',
            dataIndex: 'Contact',
            key: 'Contact',
        },
        {
            title: '邮箱',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: '图片',
            dataIndex: 'Image',
            key: 'Image',
            render: (_, record) => {
                return (
                    <Image src={record.Image}></Image>
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost danger onClick={() => del(record.Username)}>删除</Button>
                </Space>
            ),
        },
    ];

    const [dataSource, setDataSource] = useState([])
    const fetchData = async () => {
        try {
            // const res = await ogmanagerApi({})
            // if (res.code === 200) {

            // }
        } catch (error) {
            console.log(error);
        }
    }

    const del = async (username: string) => {
        try {
            // const res = await organizerApi.delog({
            //     username
            // })
            // if (res.code === 200) {
            //     message.success(res.msg)
            // }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }
    useDeepCompareEffect(() => {
        fetchData()
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<OgmanagerParamsType.CreateogType>['onFinish'] = async (values) => {
        try {
            const res = await ogmanagerApi.createogmanager(values)
            if (res.code === 200) {
                message.success(res.msg)
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed: FormProps<OgmanagerParamsType.CreateogType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div style={{ padding: '20px 0' }}>
        <Button type="primary" style={{ marginBottom: '20px' }} onClick={showModal}>新增</Button>
        <Modal title="填写" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered footer={null}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="ID"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item<OgmanagerParamsType.CreateogType>
                    label="管理员用户名"
                    name="username"
                    rules={[{ required: true, message: '请填写管理员用户名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<OgmanagerParamsType.CreateogType>
                    label="管理员昵称名"
                    name="nickname"
                    rules={[{ required: true, message: '请填写管理员昵称名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<OgmanagerParamsType.CreateogType>
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请填写密码' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<OgmanagerParamsType.CreateogType>
                    label="管理类型"
                    name="racetype"
                    rules={[{ required: true, message: '请填写管理类型' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<OgmanagerParamsType.CreateogType>
                    label="图片"
                    name="image"
                    rules={[{ required: true, message: '请上传图片' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        <Table bordered columns={columns} dataSource={dataSource} scroll={{ x: 1500, y: 500 }} pagination={false} />
    </div>
}

export default Manager