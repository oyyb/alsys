import { post } from "../utils/api"
import { Result } from "./baseHelper"

declare interface UploadTypeMethod {
    /**
     * @description 上传图片
     */
    uploadImages: (params: FormData) => Promise<Result<UploadResultType.UploadImagesType>>
}

/**
 * @description 上传接口入参
 */
declare namespace UploadParamsType {

    /**
     * @description 上传图片
     */
    interface UploadImagesType {
        file: FormData
    }
}

/**
 * @description 上传接口出参
 */
declare namespace UploadResultType {

    /**
     * @description 上传图片返回值
     * @return 
     */
    interface UploadImagesType {
        // fileName: string
        url: string
        // size: number
        // type: string
    }
}

const uploadApi: UploadTypeMethod = {
    uploadImages: async (params) => {
        let url = '/uploadimg';
        return await post(url, params, {
            headers: {
                // 如果需要，可以显式设置Content-Type为`multipart/form-data`
                'Content-Type': 'multipart/form-data'
            }
        });
    },
}

export default uploadApi