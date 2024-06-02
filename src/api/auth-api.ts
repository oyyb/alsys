import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface AuthEntity {
    email: string;
    image: string;
    nickname: string;
    password: string;
    username: string;
    // [property: string]: any;
}

export interface AuthTypeMethod {
    /**
     * @description 登陆方法
     */
    login: (params: AuthParamsType.LoginType) => Promise<Result<AuthResultType.LoginType>>

    /**
     * @description 登陆方法
     */
    register: (params: AuthParamsType.RegisterType) => Promise<Result<AuthResultType.LoginType>>
}

/**
 * @description 接口入参
 */
namespace AuthParamsType {

    /**
     * @description 登陆
     */
    export interface LoginType extends Pick<AuthEntity, 'username' | 'password'> {
        type: string
    }

    /**
     * @description 注册
     */
    export interface RegisterType extends AuthEntity {

    }
}

/**
 * @description 接口出参
 */
namespace AuthResultType {

    /**
     * @description 登陆返回值
     * @return 
     */
    export interface LoginType {
        Account: string;
        id: number;
        Nickname: string;
        Password: string;
    }
    

    /**
     * @description 注册返回值
     * @return 
     */
    export interface RegisterType {

    }
}

const baseUrl = ''
const authApi: AuthTypeMethod = {
    login: async (params) => {
        let url = `${baseUrl}/login`;
        return await post(url, params);
    },
    register: async (params) => {
        let url = `${baseUrl}/register`;
        return await post(url, params);
    },
}

export { authApi, type AuthResultType, type AuthParamsType }