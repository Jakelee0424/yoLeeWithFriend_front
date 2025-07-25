const initialState = {
    data:{

    }
};
  
// 리듀서
const search = (state = initialState, action) => {
  
  switch (action.type) {
    case "search":
     return {
        data: {
          ...state.data,              // 기존 값 유지
          ...action.payload.data      // 새로운 값 병합
        }
      };
    case "searchClear": // ✅ 초기화 처리
      return initialState;  
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default search;