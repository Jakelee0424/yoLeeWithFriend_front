import Fetcher from 'utils/Fetcher';

export const fetcherBoardMainList = async (data) => {

      const fetcher = new Fetcher().setUrl(`/board/all?type=${data.type}`)
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        return result;
        //console.log("result : ", result.data);
      } catch (error) {
        console.error('login error:', error);
      }

};

export const fetcherBoardRandomList = async (data) => {

      const fetcher = new Fetcher().setUrl(`/board/randomAll?type=${data.type}&clickCnt=${0}`)
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        return result;
        //console.log("result : ", result.data);
      } catch (error) {
        console.error('login error:', error);
      }

};

