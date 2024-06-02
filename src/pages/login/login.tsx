import { Button, Form, FormProps, Input, Radio, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useUserInfo } from '../../hooks/useUserInfo';
import { AuthEntity, AuthParamsType, authApi } from '../../api/auth-api';
import { roleItem } from '../../config/config';

const InputPassword = Input.Password
const FormItem = Form.Item

export default function Login() {
    const navigate = useNavigate()
    const { getUserInfo, setUserInfo } = useUserInfo()
    const onFinish: FormProps<AuthParamsType.LoginType>["onFinish"] = async (values) => {
        try {
            const res = await authApi.login(values)
            if (res.code !== 200) {
                message.error('获取用户信息失败!');
                return
            }
            message.success('登陆成功!');
            setUserInfo('userInfo', res.data)
            if (values.type === '1') {
                navigate('/admin-main/organizer-manage')
            } else if (values.type === '2') {
                navigate('/organizer-main/manager')
            } else if (values.type === '3') {
                navigate('/ogmanager-main/race')
            } else if (values.type === '4') {
                navigate('/user-main/user-index')
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const onFinishFailed: FormProps<AuthParamsType.LoginType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <main>
            {/* <div className='border-solid border-2 border-[#1677ff] shadow-[#1677ff] rounded-lg px-24 py-4'> */}

            <h1 style={{ textAlign: 'center', fontSize: '60px', fontWeight: 'bold', padding: '24px' }}>体育售票系统</h1>

            <h1 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', padding: '24px' }}>登陆</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 300, margin: '0 auto' }}
                initialValues={{ role: 'user' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <FormItem<AuthParamsType.LoginType>
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input placeholder="请输入用户名" />
                </FormItem>

                <FormItem<AuthParamsType.LoginType>
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <InputPassword placeholder="请输入密码" />
                </FormItem>

                <Form.Item<AuthParamsType.LoginType>
                    label="角色"
                    name="type"
                >
                    <Radio.Group options={roleItem} />
                </Form.Item>

                <FormItem wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登陆
                    </Button>
                    <Button type="link" htmlType="button" onClick={() => navigate('/register')}>
                        去注册
                    </Button>
                </FormItem>
            </Form>
            {/* </div> */}
        </main>
    )
};