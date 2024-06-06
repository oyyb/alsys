import { Button, Form, FormProps, Image, Input, Modal, Space, Table, TableProps, Upload, UploadFile, UploadProps, message } from "antd";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";
import { useState } from "react";
import { TeamParamsType, teamApi } from "../../api/team-api";
import uploadApi from "../../api/upload-api";
import { FileType, getBase64 } from "../../utils/myUtils";
import { PlusOutlined } from '@ant-design/icons';
import { useUserInfo } from "../../hooks/useUserInfo";

const OrganizerTeam = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [form] = Form.useForm();
    const { getUserInfo } = useUserInfo()
    const columns: TableProps<BaseResultType.TeamType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left'
        },
        {
            title: '负场',
            dataIndex: 'Lose',
            key: 'Lose',
        },
        {
            title: '胜场',
            dataIndex: 'Win',
            key: 'Win',
        },
        {
            title: '赛事方信息',
            dataIndex: 'Info',
            key: 'Info',
        },
        {
            title: '球队类型',
            dataIndex: 'Racetype',
            key: 'Racetype',
        },
        {
            title: '所属赛事方ID',
            dataIndex: 'Ogid',
            key: 'Ogid',
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
            "id": 1,
            "Name": "洛杉矶湖人队",
            "Win": 12,
            "Lose": 0,
            "Info": "美国洛杉矶湖人队，xxxxxx",
            "Racetype": "篮球",
            "Image": "/static/image/ogmanager/a.png",
            "Ogid": 1
        },
        {
            "id": 2,
            "Name": "金州勇士队",
            "Win": 11,
            "Lose": 0,
            "Info": "金州勇士队，xxxx",
            "Racetype": "篮球",
            "Image": "/static/image/ogmanager/a.png",
            "Ogid": 1
        },
        {
            "id": 3,
            "Name": "洛杉矶快船队",
            "Win": 10,
            "Lose": 0,
            "Info": "洛杉矶快船队，xxxxx",
            "Racetype": "篮球",
            "Image": "/static/image/ogmanager/a.png",
            "Ogid": 1
        }
    ])
    const fetchData = async () => {
        try {
            const res = await baseApi.team({
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

    const onFinish: FormProps<TeamParamsType.CreateTeamType>['onFinish'] = async (values) => {
        try {
            const res = await teamApi.createteam(values)
            if (res.code === 200) {
                message.success(res.msg)
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed: FormProps<TeamParamsType.CreateTeamType>['onFinishFailed'] = (errorInfo) => {
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

                <Form.Item<TeamParamsType.CreateTeamType>
                    label="球队名称"
                    name="name"
                    rules={[{ required: true, message: '请填写球队名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<TeamParamsType.CreateTeamType>
                    label="球队信息"
                    name="info"
                    rules={[{ required: true, message: '请填写球队信息' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item<TeamParamsType.CreateTeamType>
                    label="球队类型"
                    name="racetype"
                    rules={[{ required: true, message: '请填写球队类型' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<TeamParamsType.CreateTeamType>
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

export default OrganizerTeam