import Fetcher from 'utils/Fetcher';

export const fetcherUserList = async (data) => {

      const fetcher = new Fetcher().setUrl(`/user/all`)
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

export const fetcherUserChangeNickName = async (data) => {

  const fetcher = new Fetcher().setUrl("/user/"+data.id+"/NickName")
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

export const fetcherUserChangeProfileImg = async (data) => {

  try {
      const response = await fetch(process.env.REACT_APP_API_URI+"/user/img", {
        method: "PUT",
        body: data
      });
      const result = await response.json();
      return result;
  } catch (error) {
    console.error('login error:', error);
  }

};

