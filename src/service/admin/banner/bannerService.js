import Fetcher from 'utils/Fetcher';

export const fetcherBannerList = async (data) => {

      const fetcher = new Fetcher().setUrl("/bannerMngr/all")
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
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
        return result;
      } catch (error) {
        console.error(error);
      }

};

export const fetcherDeleteBanner = (data) => {
      const fetcher = new Fetcher().setUrl("/bannerMngr/delete?ids="+data)
                                         .setMethod("DELETE");
      try {
        const result = fetcher.jsonFetch();
        return result;
      } catch (error) {
        console.error(error);
      }

};

export const fetcherRestoreBanner = (data) => {
      const fetcher = new Fetcher().setUrl("/bannerMngr/restore")
                                    .setMethod("POST")
                                    .setData(JSON.stringify(data)); 
      try {
        const result = fetcher.jsonFetch();
        return result;
      } catch (error) {
        console.error(error);
      }

};

export const fetcherInsertBanner = (data) => {
  const fetcher = new Fetcher().setUrl("/bannerMngr/insert")
                                .setMethod("POST")
                                .setData(JSON.stringify(data)); 
  try {
    const result = fetcher.jsonFetch();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }

};

export const fetcherBannerLevelChange = async (data) => {
  const fetcher = new Fetcher().setUrl("/bannerMngr/level")
                                .setMethod("POST")
                                .setData(JSON.stringify(data)); 

  try {
    const result = await fetcher.jsonFetch(); 
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;  
  }
};

export const fetcherBannerUpdate = async (data) => {
  const fetcher = new Fetcher().setUrl("/bannerMngr/update")
                                .setMethod("POST")
                                .setData(JSON.stringify(data)); 

  try {
    const result = await fetcher.jsonFetch(); 
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;  
  }
};