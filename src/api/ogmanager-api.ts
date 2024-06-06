/**
 * 赛事方管理员表接口
 */
import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface OgmanagerEntity {
    image: string;
    nickname: string;
    ogid: number;
    password: string;
    racetype: string;
    username: string;
}

export interface OgmanagerTypeMethod {
    /**
     * @description 创建方法
     */
    createogmanager: (params: OgmanagerParamsType.CreateogType) => Promise<Result<OgmanagerResultType.CreateogType>>

    /**
     * @description 删除方法
     */
    delog: (params: OgmanagerParamsType.DelogType) => Promise<Result<OgmanagerResultType.DelogType>>
}

/**
 * @description 接口入参
 */
namespace OgmanagerParamsType {

    /**
     * @description 创建
     */
    export interface CreateogType extends OgmanagerEntity {

    }

    /**
     * @description 删除
     */
    export interface DelogType extends Pick<OgmanagerEntity, 'username'> {

    }
}

/**
 * @description 接口出参
 */
namespace OgmanagerResultType {

    /**
     * @description 创建返回值
     * @return 
     */
    export interface CreateogType {

    }
    

    /**
     * @description 删除返回值
     * @return 
     */
    export interface DelogType {

    }
}

const baseUrl = '/organizer'
const ogmanagerApi: OgmanagerTypeMethod = {
    createogmanager: async (params) => {
        let url = `${baseUrl}/createogmanager`;
        return await post(url, params);
    },
    delog: async (params) => {
        let url = `${baseUrl}/delog`;
        return await post(url, params);
    },
}

export { ogmanagerApi, type OgmanagerResultType, type OgmanagerParamsType }