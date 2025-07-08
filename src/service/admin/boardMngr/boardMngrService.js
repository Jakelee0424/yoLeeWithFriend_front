import Fetcher from 'utils/Fetcher';

export const fetcherBoardMngrList = async (data) => {

      const fetcher = new Fetcher().setUrl("/boardMngr/all"+data.queryParam)
                                         .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        return result;
        //console.log("result : ", result.data);
      } catch (error) {
        console.error('login error:', error);
      }

};

export const fetcherBoard = async (data) => {

  const fetcher = new Fetcher().setUrl("/board/"+data.boardId)
                                     .setMethod("GET");
  try {
    const result = await fetcher.jsonFetch();
    return result;
    //console.log("result : ", result.data);
  } catch (error) {
    console.error('login error:', error);
  }

};

export const fetcherBoardSave = async (data) => {

  // const fetcher = new Fetcher().setUrl("/board")
  //                                    .setMethod("POST")
  //                                    .setData(JSON.stringify(data));
  // try {
  //   const result = await fetcher.jsonFetch();
  //   return result;
  //   //console.log("result : ", result.data);
  // } catch (error) {
  //   console.error('login error:', error);
    
  // }
  //console.log(data)
  try {
      const response = await fetch(process.env.REACT_APP_API_URI+"/board", {
        method: "POST",
        body: data
      });
      const result = await response.json();
      return result;
  } catch (error) {
    console.error('login error:', error);
  }


};

export const fetcherBoardDelte = async (data) => {

  const fetcher = new Fetcher().setUrl("/board?ids="+data.ids)
                                     .setMethod("DELETE");
  try {
    const result = await fetcher.jsonFetch();
    return result;
    //console.log("result : ", result.data);
  } catch (error) {
    console.error('login error:', error);
  }

};

