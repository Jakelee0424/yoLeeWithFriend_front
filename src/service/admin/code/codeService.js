import Fetcher from 'utils/Fetcher';

export const fetcherCode = async (codeId) => {

  const fetcher = new Fetcher().setUrl("/code/"+codeId)
                                     .setMethod("GET");
  try {
    const result = await fetcher.jsonFetch();
    return result;
    //console.log("result : ", result.data);
  } catch (error) {
    console.error('login error:', error);
  }

};


export const fetcherCodeList = async (parentCodeId) => {

  const fetcher = new Fetcher().setUrl("/code/all/"+parentCodeId)
                                     .setMethod("GET");
  try {
    const result = await fetcher.jsonFetch();
    return result;
    console.log("result : ", result.data);
  } catch (error) {
    console.error('login error:', error);
  }

};


