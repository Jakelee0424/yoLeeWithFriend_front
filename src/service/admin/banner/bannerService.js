import Fetcher from 'utils/Fetcher';

export const fetcherBannerList = async (data) => {

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

export const fetcherExpiredBannerList = async (data) => {

      const fetcher = new Fetcher().setUrl("/bannerMngr/expired")
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        console.log(result);
        return result;
      } catch (error) {
        console.error('login error:', error);
      }

};

export const fetcherDeleteBanner = (data) => {

      console.log(data)

      const fetcher = new Fetcher().setUrl("/bannerMngr/delete?ids="+data)
                                         .setMethod("DELETE");
      try {
        const result = fetcher.jsonFetch();
        console.log(result);
        return result;
      } catch (error) {
        console.error('login error:', error);
      }

};