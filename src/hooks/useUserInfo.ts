export type getUserInfotype = 'userInfo' | 'token'
export const useUserInfo = () => {
    const getUserInfo = (type: getUserInfotype) => {
        let data = localStorage.getItem(type)
        if (data) {
            return JSON.parse(data)
        }
    }

    const setUserInfo = (type: getUserInfotype, data: any) => {
        localStorage.setItem(type, JSON.stringify(data))
    }

    const removeUserInfo = (type: getUserInfotype) => {
        localStorage.removeItem(type)
    }
    return {
        getUserInfo,
        setUserInfo,
        removeUserInfo
    }
}