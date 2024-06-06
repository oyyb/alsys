import { GetProp, UploadProps } from 'antd';
import * as XLSX from 'xlsx'

const readWorkbookFromLocalFile = (files: File) => {
    let respondBody = {};
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(files);
    return new Promise(function (resolve, reject) {
        fileReader.onload = function (ev: ProgressEvent<FileReader>) {
            try {
                const data = ev.target?.result;
                const workbook = XLSX.read(data, {
                    type: "binary",
                }); // 以二进制流方式读取得到整份excel表格对象
                let sheetContent = [];
                // 遍历每张表读取
                for (let sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        const res = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                        sheetContent.push(res)
                    }
                }
                respondBody = {
                    code: 100,
                    msg: "文件解析成功",
                    body: sheetContent,
                };
                resolve(respondBody);
            } catch (e) {
                respondBody = {
                    code: 500,
                    msg: "文件类型不正确",
                    body: "",
                };
                reject(respondBody);
            }
        };
    });
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}
export {
    readWorkbookFromLocalFile,
    getBase64,
    type FileType
}