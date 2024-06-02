/**
 * 赛事方表接口
 */
import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface OrganizerEntity {
    contact: string;
    email: string;
    image: string;
    info: string;
    nickname: string;
    password: string;
    pos: string;
    username: string;
}

export interface OrganizerTypeMethod {
    /**
     * @description 创建方法
     */
    createog: (params: OrganizerParamsType.CreateogType) => Promise<Result<OrganizerResultType.CreateogType>>

    /**
     * @description 删除方法
     */
    delog: (params: OrganizerParamsType.DelogType) => Promise<Result<OrganizerResultType.DelogType>>
}

/**
 * @description 接口入参
 */
namespace OrganizerParamsType {

    /**
     * @description 创建
     */
    export interface CreateogType extends OrganizerEntity {

    }

    /**
     * @description 删除
     */
    export interface DelogType extends Pick<OrganizerEntity, 'username'> {

    }
}

/**
 * @description 接口出参
 */
namespace OrganizerResultType {

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

const baseUrl = '/manager'
const organizerApi: OrganizerTypeMethod = {
    createog: async (params) => {
        let url = `${baseUrl}/createog`;
        return await post(url, params);
    },
    delog: async (params) => {
        let url = `${baseUrl}/delog`;
        return await post(url, params);
    },
}

export { organizerApi, type OrganizerResultType, type OrganizerParamsType }