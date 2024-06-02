import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, MenuProps, Space, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserInfo } from "../../hooks/useUserInfo";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('赛事管理', 'ogmanager-main/race', <SettingOutlined />),
    getItem('场地管理', 'ogmanager-main/place', <SettingOutlined />),
    getItem('球队管理', 'ogmanager-main/team', <SettingOutlined />),
];

export default function OgmanagerMain() {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { getUserInfo, removeUserInfo } = useUserInfo()
    const userInfo = getUserInfo('userInfo')
    const onClick: MenuProps['onClick'] = (e) => {
        navigate('/' + e.key)
    };

    const logout = () => {
        removeUserInfo('userInfo')
        removeUserInfo('token')
        navigate('/login')
    }
    const dropdownItems: MenuItem[] = [
        {
            key: '/logout',
            label: (
                <p onClick={logout}>
                    退出登陆
                </p>
            ),
            // icon: <PieChartOutlined />
        },
    ]

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: '#fff', fontSize: '26px' }}>赛事方管理员端</div>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['ogmanager-main/race']} mode="inline" items={items} onClick={onClick} />
            </Sider>
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ padding: 0, background: colorBgContainer, display: "flex", justifyContent: "space-between" }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Space style={{padding:'20px'}}>
                        {
                            userInfo?.name ? <p>欢迎您：{userInfo.name}</p> : <></>
                        }
                        <Dropdown menu={{ items: dropdownItems }} >
                            <div onClick={(e) => e.preventDefault()}>
                                <Space>
                                    更多设置
                                    <DownOutlined />
                                </Space>
                            </div>
                        </Dropdown>
                    </Space>
                </Header>
                <Content style={{ margin: '0 16px', height: 'calc(100% - 64px)' }}>
                    {/* <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    > */}
                    {/* {children} */}
                    <Outlet></Outlet>
                    {/* </div> */}
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout >
    );
}
