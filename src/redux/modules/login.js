const initialState = {
    id: 0,
    nickName :"",
    profilePath : "",
    oauthType:"",
    regDt : ""
};
  
// 리듀서
const login = (state = initialState, action) => {
  
  switch (action.type) {
    case "PLUS_ONE":
      return {id: action.payload.id, nickName: action.payload.nickName, profilePath: action.payload.profilePath, oauthType: action.payload.oauthType};
    case "changeNickName":
      return {nickName: action.payload.nickName, profilePath: action.payload.profilePath};
    case "RESET_USER": // 초기화 액션
      return initialState;    
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default login;