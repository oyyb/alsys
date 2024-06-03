import { Button, Form, FormProps, Input, InputNumber, Modal, Space, Table, TableProps, message } from "antd";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";
import { useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import { TicketsParamsType, ticketsApi } from "../../api/ticket-api";

const Race = () => {
    const { getUserInfo } = useUserInfo()
    const [form] = Form.useForm();
    const columns: TableProps<BaseResultType.RaceunstartType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            fixed: 'left'
        },
        {
            title: '赛事方管理员ID',
            dataIndex: 'Ogmgid',
        },
        {
            title: '比赛名称',
            dataIndex: 'Name',
        },
        {
            title: '赛事方ID',
            dataIndex: 'Ogid',
        },
        {
            title: '场地ID',
            dataIndex: 'Placeid',
        },
        {
            title: '开始时间',
            dataIndex: 'Stime',
        },
        {
            title: '比赛状态',
            dataIndex: 'Status',
        },
        {
            title: '球队1ID',
            dataIndex: 'Teamid1',
        },
        {
            title: '球队1得分',
            dataIndex: 'Teamscore1',
        },
        {
            title: '球队2ID',
            dataIndex: 'Teamid2',
        },
        {
            title: '球队2得分',
            dataIndex: 'Teamscore2',
        },
        {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            width: 180,
            render: (_, record) => (
                <Space size="middle">
                    {/* <Button type="primary" onClick={() => showModal(record)}>编辑</Button> */}
                    <Button type="primary" onClick={() => showModal(record.id)}>发布门票</Button>
                </Space>
            ),
        },
    ];

    const [dataSource, setDataSource] = useState([
        {
            "id": 2,
            "Ogmgid": 1,
            "Name": "湖人VS勇士常规赛",
            "Ogid": 1,
            "Placeid": 1,
            "Stime": "2024-09-12",
            "Status": "未开始",
            "Teamid1": 1,
            "Teamscore1": 0,
            "Teamid2": 2,
            "Teamscore2": 0
        },
        {
            "id": 3,
            "Ogmgid": 1,
            "Name": "湖人VS勇士季后赛",
            "Ogid": 1,
            "Placeid": 1,
            "Stime": "2024-09-14",
            "Status": "未开始",
            "Teamid1": 1,
            "Teamscore1": 0,
            "Teamid2": 2,
            "Teamscore2": 0
        }
    ])
    const fetchData = async () => {
        try {
            const res = await baseApi.raceunstart({
                ogid: getUserInfo('userInfo').id
            })
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

    const showModal = (raceid?: number) => {
        setIsModalOpen(true);
        form.setFieldsValue({
            raceid: raceid,
        })
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<TicketsParamsType.PubTicketsType>['onFinish'] = async (values) => {
        try {
            const res = await ticketsApi.pubtickets(values)
            if (res.code === 200) {
                message.success(res.msg)
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed: FormProps<TicketsParamsType.PubTicketsType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div style={{ padding: '20px 0' }}>
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
                <Form.Item<TicketsParamsType.PubTicketsType>
                    label="raceID"
                    name="raceid"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item<TicketsParamsType.PubTicketsType>
                    label="库存"
                    name="count"
                    rules={[{ required: true, message: '请填写库存' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item<TicketsParamsType.PubTicketsType>
                    label="价格"
                    name="price"
                    rules={[{ required: true, message: '请填写价格' }]}
                >
                    <InputNumber />
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

export default Race