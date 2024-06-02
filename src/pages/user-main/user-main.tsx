import { Outlet, useLocation, useNavigate } from "react-router-dom";
import './user-main.css'
import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";

export default function UserMain() {
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
                </div>
                <div style={{ marginTop: '80px', padding: '20px' }}>
                    <Outlet></Outlet>
                </div>
            </ConfigProvider>
        </div>
    );
}
