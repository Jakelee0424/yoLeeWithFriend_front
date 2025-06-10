import * as codeService from "service/admin/code/codeService";


export const getCodeNameByIdApi  = async (codeId) => {
    try {
        const outPutData = await codeService.fetcherCode(codeId);
        return outPutData.data.name;
    } catch (error) {
        console.error(`ID ${codeId}에 대한 코드 리스트를 가져오는 중 오류 발생:`, error);
        throw error; // 에러도 호출자에게 전파
    }
};

export const getCodeListByParentIdApi = async  (parentCodeId) => {
    try {
        const outPutData = await codeService.fetcherCodeList(parentCodeId);
        return outPutData.data;
    } catch (error) {
        console.error(`ID ${parentCodeId}에 대한 코드 리스트를 가져오는 중 오류 발생:`, error);
        throw error; // 에러도 호출자에게 전파
    }
};

