import { useState } from "react"
import { BaseResultType, baseApi } from "../../api/base-api"
import { Button, Form, FormProps, Input, InputNumber, Modal, Popconfirm, PopconfirmProps, message } from "antd"
import { useDeepCompareEffect } from "ahooks"
import { TicketsParamsType, ticketsApi } from "../../api/ticket-api"
import { useUserInfo } from "../../hooks/useUserInfo"

const UserTicket = () => {
    const [data, setData] = useState<BaseResultType.TicketsType[]>([
        {
            "count": 494,
            "id": 2,
            "price": 19.9,
            "race": [
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
            ],
            "raceid": 3,
            "status": "在售"
        },
        {
            "count": 122,
            "id": 3,
            "price": 122,
            "race": [
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
                }
            ],
            "raceid": 2,
            "status": "在售"
        }
    ])
    const fetchData = async () => {
        try {
            const res = await baseApi.tickets({})
            if (res.code === 200) {
                if (res.data) {
                    setData(res.data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useDeepCompareEffect(() => {
        fetchData()
    }, [])

    const { getUserInfo } = useUserInfo()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = (data?: Omit<TicketsParamsType.BuyTicketsType, 'userid' | 'count'>) => {
        setIsModalOpen(true);
        if (data) {
            console.log("getUserInfo('userInfo').id", getUserInfo('userInfo').id);

            form.setFieldsValue({
                ...data,
                count: 1
            })
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<TicketsParamsType.BuyTicketsType>['onFinish'] = async (values) => {
        try {
            const res = await ticketsApi.buytickets({ ...values, userid: getUserInfo('userInfo').id })
            if (res.code === 200) {
                message.success(res.msg);
            } else {
                message.warning(res.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed: FormProps<TicketsParamsType.BuyTicketsType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <div>
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
                <Form.Item<TicketsParamsType.BuyTicketsType>
                    label="门票ID"
                    name="ticketsid"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item<TicketsParamsType.BuyTicketsType>
                    label="购买金额"
                    name="price"
                    rules={[{ required: true, message: '请输入购买金额' }]}
                >
                    <InputNumber disabled />
                </Form.Item>

                <Form.Item<TicketsParamsType.BuyTicketsType>
                    label="购买数量"
                    name="count"
                    rules={[{ required: true, message: '请输入购买数量' }]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        {
            data.map((val, idx) => {
                return (
                    <div key={val.id} style={{ display: 'flex', color: '#fff', backgroundColor: '#000', justifyContent: 'space-evenly', margin: '0 120px 30px 120px', alignItems: 'center', padding: '30px 0' }}>
                        <div>
                            <p style={{ fontSize: '26px', color: 'red' }}>¥ {val.price}</p>
                            <p style={{ fontSize: '22px' }}>剩余{val.count}张</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ fontSize: '32px' }}>{val.race[0].Name}</p>
                            <p style={{ fontSize: '22px' }}>{val.race[0].Stime}</p>
                        </div>

                        <div>
                            <Button type='primary' onClick={() => showModal({
                                ticketsid: val.id,
                                price: val.price,
                            })}>购买</Button>
                        </div>
                    </div>
                )
            })
        }
    </div>
}

export default UserTicket