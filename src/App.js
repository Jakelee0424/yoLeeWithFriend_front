
import React from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main";
import { lazy } from "react";
import AppAdmin from "./AppAdmin";
import Test from "pages/user/test/Test";
import IPBlockProtectedRoute from "pages/user/util/IPBlockProtectedRoute";
import FullLayoutUser from "pages/user/template/FullLayoutUser";
import BoardDetail from "pages/user/board/detail/BoardDetail";
import BoardVersus from "pages/user/board/versus/BoardVersus";


function App () {
  return (
      <div className="app" style={{width:"100%", height:"100%"}}>      
          <Routes>   
            {/* 일반 유저용 메인 페이지 */}
            <Route path="/" element={ <FullLayoutUser /> }> {/* 기본 경로 */}
              {/* 보호 라우트 그룹 */}
              <Route element={<IPBlockProtectedRoute />}>
                <Route path="/test" element={<Test />} /> {/* /test */}
                <Route path="/board/detail" element={<BoardDetail />} /> {/* /BoardDetail */}
                <Route path="/board/versus" element={<BoardVersus />} /> {/* /BoardVersus */}
              </Route>
              <Route index element={<Main />} /> {/* 기본 경로 */}  
            </Route>
          </Routes>
      </div>
  );
};

export default App;
