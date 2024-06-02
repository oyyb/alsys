import { Button, DatePicker, DatePickerProps, Form, FormInstance, FormProps, Image, Input, Modal, Space, Table, TableProps, message } from "antd";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";
import { useState } from "react";
import { OrganizerParamsType, organizerApi } from "../../api/organizer-api";
import { useUserInfo } from "../../hooks/useUserInfo";
import { RaceParamsType } from "../../api/race-api";
import dayjs from "dayjs";
import { PlaceParamsType } from "../../api/place-api";

const Place = () => {
    const { getUserInfo } = useUserInfo()
    const [form] = Form.useForm();
    const columns: TableProps<BaseResultType.UsableplacesType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            fixed: 'left'
        },
        {
            title: '赛事方ID',
            dataIndex: 'ogid',
        },
        {
            title: '场地名称',
            dataIndex: 'name',
        },
        {
            title: '联系方式',
            dataIndex: 'contact',
        },
        {
            title: '比赛类型',
            dataIndex: 'racetype',
        },
        {
            title: '场地状态',
            dataIndex: 'status',
        },
        {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            width: 180,
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showModal(record)}>编辑</Button>
                    <Button type="primary" ghost danger onClick={() => del(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];

    const [dataSource, setDataSource] = useState<BaseResultType.UsableplacesType[]>([
        {
            contact: "1008685",
            id: 2,
            name: "xx篮球场2号",
            ogid: 2,
            racetype: "篮球",
            status: "可出租"
        },
        {
            contact: "1008685",
            id: 2,
            name: "xx篮球场2号",
            ogid: 2,
            racetype: "篮球",
            status: "可出租"
        }
    ])
    const fetchData = async () => {
        try {
            const res = await baseApi.usableplaces({})
            if (res.code === 200) {
                if (res.data) {
                    setDataSource(res.data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const edit = async (id: number) => {
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

    const del = async (id: number) => {
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

    const showModal = (data?: BaseResultType.UsableplacesType) => {
        setIsModalOpen(true);
        form.setFieldsValue(data)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<OrganizerParamsType.CreateogType>['onFinish'] = async (values) => {
        try {
            // const res = await organizerApi.createog(values)
            // if (res.code === 200) {
            //     message.success(res.msg)
            // }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed: FormProps<OrganizerParamsType.CreateogType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div style={{ padding: '20px 0' }}>
        <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => showModal()}>新增</Button>
        <Modal title="填写" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered footer={null}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="ID"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item<PlaceParamsType.CreatePlaceType>
                    label="场地名称"
                    name="name"
                    rules={[{ required: true, message: '请填写场地名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<PlaceParamsType.CreatePlaceType>
                    label="赛事方ID"
                    name="ogid"
                    rules={[{ required: true, message: '请填写赛事方ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<PlaceParamsType.CreatePlaceType>
                    label="场地类型"
                    name="racetype"
                    rules={[{ required: true, message: '请填写场地类型' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<PlaceParamsType.CreatePlaceType>
                    label="联系方式"
                    name="contact"
                    rules={[{ required: true, message: '请填写联系方式' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<PlaceParamsType.CreatePlaceType>
                    label="场地状态"
                    name="status"
                    rules={[{ required: true, message: '请填写场地状态' }]}
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
        <Table rowKey={(record) => record.id} bordered columns={columns} dataSource={dataSource} scroll={{ x: 1500, y: 500 }} pagination={false} />
    </div>
}

export default Place