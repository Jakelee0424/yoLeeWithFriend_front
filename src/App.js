
import React from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main";
import { lazy } from "react";
import AppAdmin from "./AppAdmin";
import Test from "pages/user/test/Test";
import IPBlockProtectedRoute from "pages/user/util/IPBlockProtectedRoute";


function App () {
  return (
      <div className="app">      
          <Routes> 
            {/* 일반 유저용 메인 페이지 */}
            <Route path="/" element={<Main />} /> {/* 기본 경로 */}
            {/* 보호 라우트 그룹 */}
            <Route element={<IPBlockProtectedRoute />}>
              <Route path="/test" element={<Test />} /> {/* /test */}
            </Route>
          </Routes>
      </div>
  );
};

export default App;
