import Fetcher from 'utils/Fetcher';

export const fetcherAdminLogin = async (data) => {

      const fetcher = new Fetcher().setUrl("/admin/login")
                                         .setMethod("POST")
                                         .setData(JSON.stringify(data));
      try {
        const result = await fetcher.jsonFetch();
        return result;
        //console.log("result : ", result.data);
      } catch (error) {
        console.error('login error:', error);
      }

};

