import { Suspense, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserInfo } from '../hooks/useUserInfo'

// 路由守卫
const BeforeEach = (props: any) => {
    const navigate = useNavigate()
    const { getUserInfo, removeUserInfo } = useUserInfo()
    const token = getUserInfo('token')
    const userInfo = getUserInfo('userInfo')
    const route = useLocation()
    const passablePath = ['/login','/register','/404','/index']
    // 监听路由变化：route.pathname
    // useEffect(() => {
    //     // window.scrollTo(0, 0)
    //     if (!passablePath.includes(route.pathname)) {
    //         if (!token) { // 判断有无token，没有跳转登录
    //             navigate('/index')
    //             return
    //         }
    //         if (!userInfo?.id) {
    //             removeUserInfo('token')
    //             removeUserInfo('userInfo')
    //             navigate('/index')
    //             return
    //         }
    //     }
    // }, [route.pathname])
//Suspense 放在这里或者App里都行，这样就只写一遍
return (
    <>
        <Suspense fallback={<h1>loading...</h1>}>{/* 路由懒加载必须添加 Suspense */}
            {props.children}
        </Suspense>
    </>
)

}
export default BeforeEach