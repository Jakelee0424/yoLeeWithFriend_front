import Fetcher from 'utils/Fetcher';

export const fetcherBannerList = async (data) => {

      const fetcher = new Fetcher().setUrl("/bannerMngr/all")
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        return result;
      } catch (error) {
        console.error('error:', error);
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

export const fetcherInsertBanner = async (data) => {

  try {
      const response = await fetch(process.env.REACT_APP_API_URI+"/bannerMngr/insert", {
        method: "POST",
        body: data
      });
      const result = await response.json();
      return result;
  } catch (error) {
    console.error('error:', error);
  }
};

export const fetcherBannerUpdate = async (data) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URI+"/bannerMngr/update", {
        method: "POST",
        body: data
      });
      const result = await response.json();
      return result;
  } catch (error) {
    console.error('error:', error);
  }
};

export const fetcherBannerLevelChange = async (data) => {
  const fetcher = new Fetcher().setUrl("/bannerMngr/level")
                                .setMethod("POST")
                                .setData(JSON.stringify(data)); 

  try {
    const result = await fetcher.jsonFetch(); 
    return result;
  } catch (error) {
    console.error(error);
    throw error;  
  }
};
