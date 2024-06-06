import { Button, Form, FormProps, Image, Input, InputNumber, Modal, Space, Table, TableProps, Upload, UploadFile, UploadProps, message } from "antd";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";
import { useState } from "react";
import { GoodsParamsType, goodsApi } from "../../api/goods-api";
import { PlusOutlined } from '@ant-design/icons';
import uploadApi from "../../api/upload-api";
import { FileType, getBase64 } from "../../utils/myUtils";

const Goods = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [form] = Form.useForm();
    
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
            const res = await baseApi.goods({})
            if (res.code === 200) {
                if (res.data) {
                    setDataSource(res.data)
                }
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

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log('newFileList', newFileList);
    }

    const handleRemove = async (file: UploadFile) => {
        console.log('file', file);

        const _fileList = fileList.filter((val, idx) => {
            if (val.uid !== file.uid) {
                return
            }
        })
        setFileList(_fileList);
    }

    const customUpload = async (file: any) => {
        try {
            const formData = new FormData()
            formData.append('file', file.file)
            const res = await uploadApi.uploadImages(formData)
            if (res.code === 200) {
                setFileList([{
                    uid: res.data?.url || '-1',
                    name: res.data?.url || '-1',
                    status: 'done',
                    url: res.data?.url,
                }])
                form.setFieldValue('url', res.data?.url)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传图片</div>
        </button>
    );

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
                form={form}
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
                >
                    <Upload
                        maxCount={1}
                        customRequest={customUpload}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        onRemove={handleRemove}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                            alt=''
                        />
                    )}
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