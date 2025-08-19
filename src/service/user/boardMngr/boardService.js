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

export const fetcherBrandList = async () => {

      const fetcher = new Fetcher().setUrl(`/board/brand`)
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        return result;
      } catch (error) {
        console.error('login error:', error);
      }

};

export const fetcherBoardFind = async (data) => {

      const fetcher = new Fetcher().setUrl(`/board/find?type=${data.type}&brandId=${data.brandId}&queryParam=${data.queryParam}`)
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        return result;
      } catch (error) {
        console.error('login error:', error);
      }

};

