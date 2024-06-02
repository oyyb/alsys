import { Button, Form, FormProps, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import { AuthEntity, authApi } from '../../api/auth-api';

const InputPassword = Input.Password
const FormItem = Form.Item

export default function Register() {
    const navigate = useNavigate()
    const onFinish: FormProps<AuthEntity>["onFinish"] = async (values) => {
        const res = await authApi.register(values)
        if (res.code === 200) {
            message.success('注册成功!');
            navigate('/login')
        } else {
            message.error('注册失败!');
        }
    };

    const onFinishFailed: FormProps<AuthEntity>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <main>
            {/* <h1 style={{ textAlign: 'center', fontSize: '60px', fontWeight: 'bold', padding: '24px' }}>赛事管理系统</h1> */}

            <h1 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', padding: '24px' }}>注册</h1>
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
                <FormItem<AuthEntity>
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input placeholder="请输入用户名" />
                </FormItem>

                <FormItem<AuthEntity>
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: '请输入真实邮箱!' }]}
                >
                    <Input placeholder="请输入真实邮箱" />
                </FormItem>

                <FormItem<AuthEntity>
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <InputPassword placeholder="请输入密码" />
                </FormItem>

                <FormItem wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" >
                        注册
                    </Button>

                    <Button type="link" htmlType="button" onClick={() => navigate('/login')}>
                        去登陆
                    </Button>
                </FormItem>
            </Form>
        </main>
    )
};