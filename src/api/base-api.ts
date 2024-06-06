/**
 * 球队表接口
 */
import { get } from "../utils/api"
import { Result } from "./baseHelper"

export interface BaseEntity {
    image: string;
    info: string;
    name: string;
    ogid: number;
    racetype: string;
}

export interface BaseTypeMethod {
    /**
     * @description 创建方法
     */
    team: (params: BaseParamsType.TeamType) => Promise<Result<BaseResultType.TeamType[]>>

    /**
     * @description 删除方法
     */
    raceunstart: (params: BaseParamsType.RaceunstartType) => Promise<Result<BaseResultType.RaceunstartType[]>>

    /**
     * @description 创建方法
     */
    teaminfo: (params: BaseParamsType.TeaminfoType) => Promise<Result<BaseResultType.TeaminfoType>>

    /**
     * @description 创建方法
     */
    tickets: (params: BaseParamsType.TicketsType) => Promise<Result<BaseResultType.TicketsType[]>>

    /**
     * @description 创建方法
     */
    goods: (params: BaseParamsType.GoodsType) => Promise<Result<BaseResultType.GoodsType[]>>

    /**
     * @description 创建方法
     */
    userticketshis: (params: BaseParamsType.UserticketshisType) => Promise<Result<BaseResultType.UserticketshisType[]>>

    /**
     * @description 创建方法
     */
    usergoodshis: (params: BaseParamsType.UsergoodshisType) => Promise<Result<BaseResultType.UsergoodshisType[]>>

    /**
     * @description 创建方法
     */
    usableplaces: (params: BaseParamsType.UsableplacesType) => Promise<Result<BaseResultType.UsableplacesType[]>>

    /**
     * @description 创建方法
     */
    getallogs: (params: BaseParamsType.GetallogsType) => Promise<Result<BaseResultType.GetallogsType[]>>

    /**
     * @description 创建方法
     */
    getogmanagers: (params: BaseParamsType.GetogmanagersType) => Promise<Result<BaseResultType.GetogmanagersType[]>>
}

/**
 * @description 接口入参
 */
namespace BaseParamsType {

    /**
     * @description 所有球队
     */
    export interface TeamType {
        ogid: string;
    }

    /**
     * @description 未开赛的赛事
     */
    export interface RaceunstartType {
        ogid: string;
    }

    /**
     * @description 未开赛的赛事
     */
    export interface TeaminfoType {
        teamid: string;
    }

    /**
     * @description 未开赛的赛事
     */
    export interface TicketsType {

    }

    /**
     * @description 未开赛的赛事
     */
    export interface GoodsType {

    }

    /**
     * @description 未开赛的赛事
     */
    export interface UserticketshisType {
        userid: string;
    }

    /**
     * @description 未开赛的赛事
     */
    export interface UsergoodshisType {
        userid: string;
    }

    /**
     * @description 未开赛的赛事
     */
    export interface UsableplacesType {

    }

    /**
     * @description 未开赛的赛事
     */
    export interface GetallogsType {

    }

    /**
     * @description 未开赛的赛事
     */
    export interface GetogmanagersType {
        ogid: string
    }
}

/**
 * @description 接口出参
 */
namespace BaseResultType {

    /**
     * @description 所有球队返回值
     * @return 
     */
    export interface TeamType {
        id: number;
        Image: string;
        Info: string;
        Lose: number;
        Name: string;
        Ogid: number;
        Racetype: string;
        Win: number;
    }


    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface RaceunstartType {
        id: number;
        name: string;
        ogid: number;
        ogmgid: number;
        placeid: number;
        status: string;
        stime: string;
        teamid1: number;
        teamid2: number;
        teamscore1: number;
        teamscore2: number;
        team1image: string;
        team2image: string;
    }

    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface TeaminfoType {
        players: {
            Age?: number;
            Height?: number;
            id?: number;
            Image?: string;
            Name?: string;
            Sex?: string;
            Teamid?: number;
            Weight?: number;
        }[];
        racehis: {
            id?: number;
            Name?: string;
            Ogid?: number;
            Ogmgid?: number;
            Placeid?: number;
            Status?: string;
            Stime?: string;
            Teamid1?: number;
            Teamid2?: number;
            Teamscore1?: number;
            Teamscore2?: number;
        }[];
        team: {
            id: number;
            image: string;
            info: string;
            lose: number;
            name: string;
            ogid: number;
            racetype: string;
            win: number;
        };
    }

    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface TicketsType {
        count: number;
        id: number;
        price: number | number;
        race: {
            id: number;
            Name: string;
            Ogid: number;
            Ogmgid: number;
            Placeid: number;
            Status: string;
            Stime: string;
            Teamid1: number;
            Teamid2: number;
            Teamscore1: number;
            Teamscore2: number;
        }[];
        raceid: number;
        status: string;
    }

    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface GoodsType {
        Count: number;
        id: number;
        Image: string;
        Info: string;
        Name: string;
        Price: number;
    }

    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface UserticketshisType {
        buytime: string;
        count: number;
        id: number;
        name: string;
        price: number | number;
        tid: number;
        uid: number;
    }

    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface UsergoodshisType {
        boughttime: string;
        cost: string;
        count: number;
        gid: number;
        id: number;
        image: string;
        name: string;
        uid: number;
    }

    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface UsableplacesType {
        contact: string;
        id: number;
        name: string;
        ogid: number;
        racetype: string;
        status: string;
    }

    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface GetallogsType {
        Contact: string;
        Email: string;
        id: number;
        Image: string;
        Info: string;
        Nickname: string;
        Password: string;
        Pos: string;
        Username: string;
    }

    /**
     * @description 未开赛的赛事返回值
     * @return 
     */
    export interface GetogmanagersType {
        id: number;
        Image: string;
        Nickname: string;
        Ogid: number;
        Password: string;
        Racetype: string;
        Username: string;
    }
}

const baseUrl = ''
const baseApi: BaseTypeMethod = {
    team: async (params) => {
        let url = `${baseUrl}/team?ogid=${params.ogid}`;
        return await get(url, params);
    },
    raceunstart: async (params) => {
        let url = `${baseUrl}/raceunstart?ogid=${params.ogid}`;
        return await get(url, params);
    },
    teaminfo: async (params) => {
        let url = `${baseUrl}/teaminfo?teamid=${params.teamid}`;
        return await get(url, params);
    },
    tickets: async (params) => {
        let url = `${baseUrl}/tickets`;
        return await get(url, params);
    },
    goods: async (params) => {
        let url = `${baseUrl}/goods`;
        return await get(url, params);
    },
    userticketshis: async (params) => {
        let url = `${baseUrl}/userticketshis?userid=${params.userid}`;
        return await get(url, params);
    },
    usergoodshis: async (params) => {
        let url = `${baseUrl}/usergoodshis?userid=${params.userid}`;
        return await get(url, params);
    },
    usableplaces: async (params) => {
        let url = `${baseUrl}/usableplaces`;
        return await get(url, params);
    },
    getallogs: async (params) => {
        let url = `${baseUrl}/getallogs`;
        return await get(url, params);
    },
    getogmanagers: async (params) => {
        let url = `${baseUrl}/getogmanagers?ogid=${params.ogid}`;
        return await get(url, params);
    },
}

export { baseApi, type BaseResultType, type BaseParamsType }