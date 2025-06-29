import Fetcher from 'utils/Fetcher';

export const fetcherLogsList = async (data) => {

      const fetcher = new Fetcher().setUrl("/logs/all")
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        return result;
        //console.log("result : ", result.data);
      } catch (error) {
        console.error('login error:', error);
      }

};

export const fetcherLogsSave = async (data) => {

  const fetcher = new Fetcher().setUrl("/logs")
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

export const fetcherIpBlock = async (data) => {

  const fetcher = new Fetcher().setUrl("/logs/IpBlock")
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

export const fetcherUnIpBlock = async (data) => {

  const fetcher = new Fetcher().setUrl("/logs/UnIpBlock")
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

export const fetcherGetIpBlock = async (data) => {

  const fetcher = new Fetcher().setUrl("/logs/getIpBlock")
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



