import Fetcher from 'utils/Fetcher';

export const fetcherAdminList = async (data) => {

      const fetcher = new Fetcher().setUrl("/admin/all")
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

export const fetcherAdmin = async (data) => {

  const fetcher = new Fetcher().setUrl("/admin/"+data.id)
                                     .setMethod("GET");
  try {
    const result = await fetcher.jsonFetch();
    return result;
    //console.log("result : ", result.data);
  } catch (error) {
    console.error('login error:', error);
  }

};

export const fetcherAdminSave = async (data) => {

  const fetcher = new Fetcher().setUrl("/admin/"+data.id)
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

