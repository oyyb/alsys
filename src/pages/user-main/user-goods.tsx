import { useState } from "react"
import { BaseResultType, baseApi } from "../../api/base-api"
import { Button, Form, FormProps, Input, InputNumber, Modal, Popconfirm, PopconfirmProps, message } from "antd"
import { useDeepCompareEffect } from "ahooks"
import { TicketsParamsType, ticketsApi } from "../../api/ticket-api"
import { useUserInfo } from "../../hooks/useUserInfo"
import { GoodsParamsType, goodsApi } from "../../api/goods-api"

const UserGoods = () => {
    const [data, setData] = useState<BaseResultType.GoodsType[]>([
        {
            "id": 2,
            "Name": "湖人队23号球衣",
            "Price": 499.9,
            "Info": "湖人对勇士客场球衣",
            "Count": 99,
            "Image": "/static/image/ogmanager/a.png"
        },
        {
            "id": 3,
            "Name": "联名棒球帽",
            "Price": 199.8,
            "Info": "xxx联名棒球帽",
            "Count": 20,
            "Image": "/static/image/ogmanager/a.png"
        }
    ])
    const fetchData = async () => {
        try {
            const res = await baseApi.goods({})
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

    const showModal = (data?: Omit<GoodsParamsType.BuyGoodsType, 'userid' | 'count'>) => {
        setIsModalOpen(true);
        if (data) {
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

    const onFinish: FormProps<GoodsParamsType.BuyGoodsType>['onFinish'] = async (values) => {
        try {
            const res = await goodsApi.buygoods({ ...values, userid: getUserInfo('userInfo').id })
            if (res.code === 200) {
                message.success(res.msg);
            } else {
                message.warning(res.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed: FormProps<GoodsParamsType.BuyGoodsType>['onFinishFailed'] = (errorInfo) => {
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
                <Form.Item<GoodsParamsType.BuyGoodsType>
                    label="门票ID"
                    name="goodsid"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item<GoodsParamsType.BuyGoodsType>
                    label="购买金额"
                    name="price"
                    rules={[{ required: true, message: '请输入购买金额' }]}
                >
                    <InputNumber disabled />
                </Form.Item>

                <Form.Item<GoodsParamsType.BuyGoodsType>
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
                        <div className="img">
                            <img src={val.Image} alt="" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ fontSize: '32px' }}>{val.Name}</p>
                            <div style={{ width: '300px', height: '150px' }}>
                                <p className="overFlow-4" style={{ fontSize: '16px', textIndent: '2rem' }}>{val.Info}</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <p style={{ fontSize: '26px', color: 'red' }}>¥ {val.Price}</p>
                                <p style={{ fontSize: '16px' }}>剩余{val.Count}件</p>
                                <Button type='primary' onClick={() => showModal({
                                    goodsid: val.id,
                                    price: val.Price,
                                })}>购买</Button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
}

export default UserGoods