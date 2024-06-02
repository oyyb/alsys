import { Button, Form, FormProps, Image, Input, InputNumber, Modal, Space, Table, TableProps, message } from "antd";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";
import { useState } from "react";
import { OrganizerParamsType, organizerApi } from "../../api/organizer-api";
import { GoodsParamsType, goodsApi } from "../../api/goods-api";

const Goods = () => {
    const columns: TableProps<BaseResultType.GoodsType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left'
        },
        {
            title: '周边名',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: '价格',
            dataIndex: 'Price',
            key: 'Price',
        },
        {
            title: '周边信息',
            dataIndex: 'Info',
            key: 'Info',
        },
        {
            title: '库存',
            dataIndex: 'Count',
            key: 'Count',
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
                    <Button type="primary" ghost danger onClick={() => del(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];

    const [dataSource, setDataSource] = useState([
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
            const res = await baseApi.getallogs({})
            if (res.code === 200) {

            }
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<GoodsParamsType.PubGoodsType>['onFinish'] = async (values) => {
        try {
            const res = await goodsApi.pubgoods(values)
            if (res.code === 200) {
                message.success(res.msg)
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed: FormProps<GoodsParamsType.PubGoodsType>['onFinishFailed'] = (errorInfo) => {
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

                <Form.Item<GoodsParamsType.PubGoodsType>
                    label="周边名"
                    name="name"
                    rules={[{ required: true, message: '请填写周边名名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<GoodsParamsType.PubGoodsType>
                    label="周边信息"
                    name="info"
                    rules={[{ required: true, message: '请填写周边信息' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item<GoodsParamsType.PubGoodsType>
                    label="价格"
                    name="price"
                    rules={[{ required: true, message: '请填写价格' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item<GoodsParamsType.PubGoodsType>
                    label="库存"
                    name="count"
                    rules={[{ required: true, message: '请填写库存' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item<GoodsParamsType.PubGoodsType>
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
        <Table rowKey={(record) => record.id} bordered columns={columns} dataSource={dataSource} scroll={{ x: 1500, y: 500 }} pagination={false} />
    </div>
}

export default Goods