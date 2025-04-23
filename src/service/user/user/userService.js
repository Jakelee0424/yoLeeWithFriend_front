import Fetcher from 'utils/Fetcher';

export const fetcherUserList = async (data) => {

      const fetcher = new Fetcher().setUrl("/user/all")
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

export const fetcherUserDelte = async (data) => {

  const fetcher = new Fetcher().setUrl("/user/"+data.id)
                                     .setMethod("DELETE");
  try {
    const result = await fetcher.jsonFetch();
    return result;
    //console.log("result : ", result.data);
  } catch (error) {
    console.error('login error:', error);
  }

};

export const fetcherUserStatus = async (data) => {

  const fetcher = new Fetcher().setUrl("/user/"+data.id)
                                     .setMethod("PUT")
                                     .setData(JSON.stringify(data));
  try {
    const result = await fetcher.jsonFetch();
    return result;
    //console.log("result : ", result.data);
  } catch (error) {
    console.error('login error:', error);
  }

};

