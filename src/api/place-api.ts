/**
 * 赛事方表接口
 */
import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface PlaceEntity {
    name: string;
    ogid: number;
    racetype: string;
    contact: string;
    status: string;
}

export interface PlaceTypeMethod {
    /**
     * @description 创建方法
     */
    addplace: (params: PlaceParamsType.CreatePlaceType) => Promise<Result<PlaceResultType.CreatePlaceType>>

    /**
     * @description 出租方法
     */
    pubplaces: (params: PlaceParamsType.PubPlacesType) => Promise<Result<PlaceResultType.PubPlacesType>>
}

/**
 * @description 接口入参
 */
namespace PlaceParamsType {

    /**
     * @description 创建
     */
    export interface CreatePlaceType extends PlaceEntity {

    }

    /**
     * @description 出租
     */
    export interface PubPlacesType extends PlaceEntity {
        placeid: number;
    }
}

/**
 * @description 接口出参
 */
namespace PlaceResultType {

    /**
     * @description 创建返回值
     * @return 
     */
    export interface CreatePlaceType {

    }


    /**
     * @description 出租返回值
     * @return 
     */
    export interface PubPlacesType {

    }
}

const baseUrl = '/ogmanager'
const placeApi: PlaceTypeMethod = {
    addplace: async (params) => {
        let url = `${baseUrl}/addplace`;
        return await post(url, params);
    },
    pubplaces: async (params) => {
        let url = `${baseUrl}/pubplaces`;
        return await post(url, params);
    },
}

export { placeApi, type PlaceResultType, type PlaceParamsType }