/**
 * 赛事表接口
 */
import { post } from "../utils/api"
import { Result } from "./baseHelper"

export interface RaceEntity {
    name: string;
    ogid: number;
    ogmgid: number;
    placeid: number;
    stime: string;
    team1id: number;
    team2id: number;
}

export interface RaceTypeMethod {
    /**
     * @description 创建方法
     */
    createrace: (params: RaceParamsType.CreateRaceType) => Promise<Result<RaceResultType.CreateRaceType>>

    /**
     * @description 修改方法
     */
    updaterace: (params: RaceParamsType.UpdateRaceType) => Promise<Result<RaceResultType.UpdateRaceType>>

    /**
     * @description 开始方法
     */
    startrace: (params: RaceParamsType.StartRaceType) => Promise<Result<RaceResultType.StartRaceType>>

    /**
     * @description 开始方法
     */
    endrace: (params: RaceParamsType.StartRaceType) => Promise<Result<RaceResultType.StartRaceType>>

    /**
     * @description 修改比分方法
     */
    changescore: (params: RaceParamsType.StartRaceType) => Promise<Result<RaceResultType.StartRaceType>>
}

/**
 * @description 接口入参
 */
namespace RaceParamsType {

    /**
     * @description 创建
     */
    export interface CreateRaceType extends RaceEntity {

    }

    /**
     * @description 创建
     */
    export interface UpdateRaceType extends RaceEntity {
        raceid: string
    }

    /**
     * @description 开始
     */
    export interface StartRaceType {
        raceid: string
    }

    /**
     * @description 结束
     */
    export interface EndRaceType {

    }

    /**
     * @description 修改比分
     */
    export interface ChangeScoreType {
        raceid: string
        team1score: number;
        team2score: number;
    }
}

/**
 * @description 接口出参
 */
namespace RaceResultType {

    /**
     * @description 创建返回值
     * @return 
     */
    export interface CreateRaceType {

    }

    /**
     * @description 编辑返回值
     * @return 
     */
    export interface UpdateRaceType {

    }


    /**
     * @description 开始返回值
     * @return 
     */
    export interface StartRaceType {

    }

    /**
     * @description 结束返回值
     * @return 
     */
    export interface EndRaceType {

    }

    /**
     * @description 修改比分返回值
     * @return 
     */
    export interface ChangeScoreType {

    }
}

const baseUrl = '/ogmanager'
const raceApi: RaceTypeMethod = {
    createrace: async (params) => {
        let url = `${baseUrl}/createrace`;
        return await post(url, params);
    },
    updaterace: async (params) => {
        let url = `${baseUrl}/updaterace`;
        return await post(url, params);
    },
    startrace: async (params) => {
        let url = `${baseUrl}/startrace`;
        return await post(url, params);
    },
    endrace: async (params) => {
        let url = `${baseUrl}/endrace`;
        return await post(url, params);
    },
    changescore: async (params) => {
        let url = `${baseUrl}/changescore`;
        return await post(url, params);
    },
}

export { raceApi, type RaceResultType, type RaceParamsType }