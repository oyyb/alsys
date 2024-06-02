import { Navigate, Route } from "react-router-dom";
// import Index from "../pages/index";
import AdminMain from "../pages/admin-main/admin-main";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import NotFound from "../pages/not-found/not-found";
import OrganizerManage from "../pages/admin-main/organizer-manage";
import Manager from "../pages/organizer-main/manager";
import OrganizerTeam from "../pages/organizer-main/team";
import Ticket from "../pages/organizer-main/ticket";
import OrganizerMain from "../pages/organizer-main/orgainzer-main";
import OgmanagerMain from "../pages/ogmanager-main/ogmanager-main";
import Race from "../pages/ogmanager-main/race";
import Place from "../pages/ogmanager-main/place";
import Team from "../pages/ogmanager-main/team";
import Goods from "../pages/organizer-main/goods";
import UserMain from "../pages/user-main/user-main";
import UserGoods from "../pages/user-main/user-goods";
import UserIndex from "../pages/user-main/user-index";
import UserPlace from "../pages/user-main/user-place";
import UserCar from "../pages/user-main/user-car";
import UserTicket from "../pages/user-main/user-ticket";
import UserBuy from "../pages/user-main/user-buy";
// import { lazy } from "react";

// const NotFound = lazy(()=>import('../pages/not-found/not-found'))
export interface Route {
    children?: Route[];
    element?: React.ReactNode;
    path?: string;
    meta?: Record<string, any>
}

export const routes: Route[] = [
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    // {
    //     path: '/index',
    //     element: <Index />
    // },
    {
        path: '/admin-main',
        element: <AdminMain />,
        children: [
            {
                path: 'organizer-manage',
                element: <OrganizerManage />
            }
        ]
    },
    {
        path: '/orgainzer-main',
        element: <OrganizerMain />,
        children: [
            {
                path: 'manager',
                element: <Manager />
            },
            {
                path: 'team',
                element: <OrganizerTeam />
            },
            {
                path: 'ticket',
                element: <Ticket />
            },
            {
                path: 'goods',
                element: <Goods />
            },
        ]
    },
    {
        path: '/ogmanager-main',
        element: <OgmanagerMain />,
        children: [
            {
                path: 'race',
                element: <Race />
            },
            {
                path: 'place',
                element: <Place />
            },
            {
                path: 'team',
                element: <Team />
            },
            
        ]
    },
    {
        path: '/user-main',
        element: <UserMain />,
        children: [
            {
                path: 'user-index',
                element: <UserIndex />
            },
            {
                path: 'user-ticket',
                element: <UserTicket />
            },
            {
                path: 'user-goods',
                element: <UserGoods />
            },
            {
                path: 'user-place',
                element: <UserPlace />
            },
            // {
            //     path: 'user-car',
            //     element: <UserCar />
            // },
            {
                path: 'user-buy',
                element: <UserBuy />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    // {
    //     // 404页面必须放在最后
    //     path: '/404',
    //     // Suspense写在这里代码比较重复，每一个懒加载都需要写，所以我们把他写到外部
    //     // element:(<Suspense fallback={<h1>loading...</h1>}>{<NotFound/>}</Suspense>),
    //     element: <NotFound />,
    //     // meta: { title: '页面未找到' },
    // },
    // {
    //     path: '*',
    //     element: <Navigate to='/404'></Navigate>,
    // },
]