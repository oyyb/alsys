/**
 * 票表接口
 */
import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface TicketsEntity {
    count: number;
    price: number;
    raceid: number;
}

export interface TicketsTypeMethod {
    /**
     * @description 创建方法
     */
    pubtickets: (params: TicketsParamsType.PubTicketsType) => Promise<Result<TicketsResultType.PubTicketsType>>

    /**
     * @description 删除方法
     */
    delog: (params: TicketsParamsType.DelogType) => Promise<Result<TicketsResultType.DelogType>>

    /**
     * @description 购买方法
     */
    buytickets: (params: TicketsParamsType.BuyTicketsType) => Promise<Result<TicketsResultType.BuyTicketsType>>

}

/**
 * @description 接口入参
 */
namespace TicketsParamsType {

    /**
     * @description 创建
     */
    export interface PubTicketsType extends TicketsEntity {

    }

    /**
     * @description 删除
     */
    export interface DelogType extends TicketsEntity {

    }

    /**
     * @description 购买
     */
    export interface BuyTicketsType extends Pick<TicketsEntity, 'price' | 'count'> {
        userid: number
        ticketsid: number
    }
}

/**
 * @description 接口出参
 */
namespace TicketsResultType {

    /**
     * @description 创建返回值
     * @return 
     */
    export interface PubTicketsType {

    }


    /**
     * @description 删除返回值
     * @return 
     */
    export interface DelogType {

    }

    /**
     * @description 购买
     */
    export interface BuyTicketsType extends TicketsEntity {

    }
}

const baseUrl = '/organizer'
const userUrl = '/user'
const ticketsApi: TicketsTypeMethod = {
    pubtickets: async (params) => {
        let url = `${baseUrl}/pubtickets`;
        return await post(url, params);
    },
    delog: async (params) => {
        let url = `${baseUrl}/delog`;
        return await post(url, params);
    },

    buytickets: async (params) => {
        let url = `${userUrl}/buytickets`;
        return await post(url, params);
    },
}

export { ticketsApi, type TicketsResultType, type TicketsParamsType }