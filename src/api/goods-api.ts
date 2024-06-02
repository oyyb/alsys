/**
 * 赛事方表接口
 */
import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface GoodsEntity {
    count: number;
    image: string;
    info: string;
    name: string;
    price: number;
}

export interface GoodsTypeMethod {
    /**
     * @description 创建方法
     */
    pubgoods: (params: GoodsParamsType.PubGoodsType) => Promise<Result<GoodsResultType.PubGoodsType>>

    /**
     * @description 购买方法
     */
    buygoods: (params: GoodsParamsType.BuyGoodsType) => Promise<Result<GoodsResultType.BuyGoodsType>>

    /**
     * @description 删除方法
     */
    delog: (params: GoodsParamsType.DelogType) => Promise<Result<GoodsResultType.DelogType>>
}

/**
 * @description 接口入参
 */
namespace GoodsParamsType {

    /**
     * @description 创建
     */
    export interface PubGoodsType extends GoodsEntity {

    }

    /**
     * @description 购买
     */
    export interface BuyGoodsType extends Pick<GoodsEntity, 'count' | 'price'> {
        goodsid: number;
        userid: number;
    }

    /**
     * @description 删除
     */
    export interface DelogType extends GoodsEntity {

    }
}

/**
 * @description 接口出参
 */
namespace GoodsResultType {

    /**
     * @description 创建返回值
     * @return 
     */
    export interface PubGoodsType {

    }

    /**
     * @description 购买
     */
    export interface BuyGoodsType {

    }

    /**
     * @description 删除返回值
     * @return 
     */
    export interface DelogType {

    }
}

const baseUrl = '/organizer'
const userUrl = '/user'
const goodsApi: GoodsTypeMethod = {
    pubgoods: async (params) => {
        let url = `${baseUrl}/pubgoods`;
        return await post(url, params);
    },
    delog: async (params) => {
        let url = `${baseUrl}/delog`;
        return await post(url, params);
    },

    buygoods: async (params) => {
        let url = `${userUrl}/buygoods`;
        return await post(url, params);
    },
}

export { goodsApi, type GoodsResultType, type GoodsParamsType }