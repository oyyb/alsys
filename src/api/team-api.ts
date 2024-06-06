/**
 * 球队表接口
 */
import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface TeamEntity {
    image: string;
    info: string;
    name: string;
    ogid: number;
    racetype: string;
}

export interface TeamTypeMethod {
    /**
     * @description 创建方法
     */
    createteam: (params: TeamParamsType.CreateTeamType) => Promise<Result<TeamResultType.CreateTeamType>>

    /**
     * @description 删除方法
     */
    delog: (params: TeamParamsType.DelogType) => Promise<Result<TeamResultType.DelogType>>
}

/**
 * @description 接口入参
 */
namespace TeamParamsType {

    /**
     * @description 创建
     */
    export interface CreateTeamType extends TeamEntity {

    }

    /**
     * @description 删除
     */
    export interface DelogType extends TeamEntity {

    }
}

/**
 * @description 接口出参
 */
namespace TeamResultType {

    /**
     * @description 创建返回值
     * @return 
     */
    export interface CreateTeamType {

    }
    

    /**
     * @description 删除返回值
     * @return 
     */
    export interface DelogType {

    }
}

const baseUrl = '/organizer'
const teamApi: TeamTypeMethod = {
    createteam: async (params) => {
        let url = `${baseUrl}/createteam`;
        return await post(url, params);
    },
    delog: async (params) => {
        let url = `${baseUrl}/delog`;
        return await post(url, params);
    },
}

export { teamApi, type TeamResultType, type TeamParamsType }