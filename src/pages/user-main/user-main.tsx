import { Outlet, useLocation, useNavigate } from "react-router-dom";
import './user-main.css'
import { useEffect, useState } from "react";
import { ConfigProvider, Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useUserInfo } from "../../hooks/useUserInfo";

type MenuItem = Required<MenuProps>['items'][number];

export default function UserMain() {
    const { getUserInfo, removeUserInfo } = useUserInfo()
    const userInfo = getUserInfo('userInfo')
    const navigate = useNavigate()
    const route = useLocation()
    const [activeNav, setActiveNav] = useState<string>()
    const navList = [
        {
            id: '/user-main/user-index',
            title: '首页'
        },
        {
            id: '/user-main/user-ticket',
            title: '购票'
        },
        {
            id: '/user-main/user-goods',
            title: '周边商品'
        },
        {
            id: '/user-main/user-place',
            title: '租用场地'
        },
        // {
        //     id: '/user-main/user-car',
        //     title: '我的购物车'
        // },
        {
            id: '/user-main/user-buy',
            title: '购买记录'
        },
    ]

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
    
    useEffect(() => {
        setActiveNav(route.pathname)
    }, [route.pathname])
    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: 'red',
                            colorPrimaryHover: 'red',
                            colorPrimaryActive: 'red',
                        },
                    },
                }}
            >
                <div className="nav">
                    <div className="img" style={{ width: '200px', marginRight: '200px' }}>
                        <img src="/logo.svg" alt="" />
                    </div>
                    {
                        navList.map((val, idx) => {
                            return <div key={val.id} className={activeNav === val.id ? "nav-content active" : 'nav-content'} onClick={() => {
                                navigate(val.id)
                            }}>{val.title}</div>
                        })
                    }
                    <Space style={{padding:'20px'}}>
                        {
                            userInfo?.Nickname ? <p>欢迎您：{userInfo.Nickname}</p> : <></>
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
                </div>
                <div style={{ marginTop: '80px', padding: '20px' }}>
                    <Outlet></Outlet>
                </div>
            </ConfigProvider>
        </div>
    );
}
