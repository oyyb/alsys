import { Button, Form, FormProps, Image, Input, Modal, Space, Table, TableProps, Upload, UploadFile, UploadProps, message } from "antd";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";
import { useState } from "react";
import { OrganizerParamsType, organizerApi } from "../../api/organizer-api";
import { FileType, getBase64 } from "../../utils/myUtils";
import uploadApi from "../../api/upload-api";
import { PlusOutlined } from '@ant-design/icons';

const OrganizerManage = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [form] = Form.useForm();
    const columns: TableProps<BaseResultType.GetallogsType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left'
        },
        {
            title: '赛事方用户名',
            dataIndex: 'Username',
            key: 'Username',
        },
        {
            title: '赛事方昵称名',
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

    const [dataSource, setDataSource] = useState([
        {
            "id": 2,
            "Username": "ogadmin1",
            "Password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
            "Nickname": "og1",
            "Info": "北京工人体育场赛事方，xxxxx",
            "Pos": "北京市",
            "Contact": "1008685",
            "Email": "12334131@qq.com",
            "Image": "/static/image/og/a.png"
        },
        {
            "id": 3,
            "Username": "ogadmin2",
            "Password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
            "Nickname": "og2",
            "Info": "上海工人体育场赛事方，xxxxx",
            "Pos": "上海市",
            "Contact": "12739817389",
            "Email": "aasdad@qq.com",
            "Image": "/static/image/og/a.png"
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

    const del = async (username: string) => {
        try {
            const res = await organizerApi.delog({
                username
            })
            if (res.code === 200) {
                message.success(res.msg)
            }
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

    const onFinish: FormProps<OrganizerParamsType.CreateogType>['onFinish'] = async (values) => {
        try {
            const res = await organizerApi.createog(values)
            if (res.code === 200) {
                message.success(res.msg)
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed: FormProps<OrganizerParamsType.CreateogType>['onFinishFailed'] = (errorInfo) => {
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

                <Form.Item<OrganizerParamsType.CreateogType>
                    label="赛事方用户名"
                    name="username"
                    rules={[{ required: true, message: '请填写赛事方用户名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<OrganizerParamsType.CreateogType>
                    label="赛事方昵称名"
                    name="nickname"
                    rules={[{ required: true, message: '请填写赛事方昵称名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<OrganizerParamsType.CreateogType>
                    label="赛事方信息"
                    name="info"
                    rules={[{ required: true, message: '请填写赛事方信息' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item<OrganizerParamsType.CreateogType>
                    label="位置"
                    name="pos"
                    rules={[{ required: true, message: '请填写位置' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<OrganizerParamsType.CreateogType>
                    label="联系方式"
                    name="contact"
                    rules={[{ required: true, message: '请填写联系方式' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<OrganizerParamsType.CreateogType>
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: '请填写邮箱' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<OrganizerParamsType.CreateogType>
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

export default OrganizerManage