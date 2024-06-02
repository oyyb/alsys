import { Button, DatePicker, DatePickerProps, Form, FormInstance, FormProps, Image, Input, Modal, Space, Table, TableProps, message } from "antd";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";
import { useState } from "react";
import { OrganizerParamsType, organizerApi } from "../../api/organizer-api";
import { useUserInfo } from "../../hooks/useUserInfo";
import { RaceParamsType } from "../../api/race-api";
import dayjs from "dayjs";

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
                    <Button type="primary" onClick={() => showModal(record)}>编辑</Button>
                    <Button type="primary" ghost danger onClick={() => del(record.id)}>删除</Button>
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

    const showModal = (data?: BaseResultType.RaceunstartType) => {
        setIsModalOpen(true);
        form.setFieldsValue({
            id: data?.id,
            name: data?.Name,
            ogid: data?.Ogid,
            ogmgid: data?.Ogmgid,
            placeid: data?.Placeid,
            stime: data?.Stime ? dayjs(data?.Stime) : undefined,
            team1id: data?.Teamid1,
            team2id: data?.Teamid2,
        })
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

                <Form.Item<RaceParamsType.CreateRaceType>
                    label="比赛名称"
                    name="name"
                    rules={[{ required: true, message: '请填写比赛名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<RaceParamsType.CreateRaceType>
                    label="场地ID"
                    name="placeid"
                    rules={[{ required: true, message: '请填写场地ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<RaceParamsType.CreateRaceType>
                    label="1队ID"
                    name="team1id"
                    rules={[{ required: true, message: '请填写1队ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<RaceParamsType.CreateRaceType>
                    label="2队ID"
                    name="team2id"
                    rules={[{ required: true, message: '请填写2队ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<RaceParamsType.CreateRaceType>
                    label="赛事方ID"
                    name="ogid"
                    rules={[{ required: true, message: '请填写赛事方ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<RaceParamsType.CreateRaceType>
                    label="赛事方管理员ID"
                    name="ogmgid"
                    rules={[{ required: true, message: '请填写赛事方管理员ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<RaceParamsType.CreateRaceType>
                    label="开始时间"
                    name="stime"
                    rules={[{ required: true, message: '请上传开始时间' }]}
                >
                    <DatePicker
                        showTime
                    />
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