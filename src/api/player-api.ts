/**
 * 赛事方表接口
 */
import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface PlayerEntity {
    height: number;
    image: string;
    name: string;
    sex: string;
    teamid: number;
    weight: number;
}

export interface PlayerTypeMethod {
    /**
     * @description 创建方法
     */
    createplayer: (params: PlayerParamsType.CreatePlayerType) => Promise<Result<PlayerResultType.CreatePlayerType>>

    /**
     * @description 出租方法
     */
    pubplaces: (params: PlayerParamsType.PubPlacesType) => Promise<Result<PlayerResultType.PubPlacesType>>
}

/**
 * @description 接口入参
 */
namespace PlayerParamsType {

    /**
     * @description 创建
     */
    export interface CreatePlayerType extends PlayerEntity {

    }

    /**
     * @description 出租
     */
    export interface PubPlacesType extends PlayerEntity {
        placeid: number;
    }
}

/**
 * @description 接口出参
 */
namespace PlayerResultType {

    /**
     * @description 创建返回值
     * @return 
     */
    export interface CreatePlayerType {

    }
    

    /**
     * @description 出租返回值
     * @return 
     */
    export interface PubPlacesType {

    }
}

const baseUrl = '/organizer'
const placeApi: PlayerTypeMethod = {
    createplayer: async (params) => {
        let url = `${baseUrl}/createplayer`;
        return await post(url, params);
    },
    pubplaces: async (params) => {
        let url = `${baseUrl}/pubplaces`;
        return await post(url, params);
    },
}

export { placeApi, type PlayerResultType, type PlayerParamsType }