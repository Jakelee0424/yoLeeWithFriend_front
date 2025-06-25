import Fetcher from 'utils/Fetcher';

export const fetcherbannerList = async (data) => {

      const fetcher = new Fetcher().setUrl("/bannerMngr/all")
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        console.log(result);
        return result;
      } catch (error) {
        console.error('login error:', error);
      }

};