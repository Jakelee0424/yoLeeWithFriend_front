
import React from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main";
import { lazy } from "react";
import AppAdmin from "./AppAdmin";

/****Layouts*****/
const FullLayout = lazy(() => import("./pages/admin/template/FullLayout.js"));

function App () {
  return (
      <div className="app">      
          <Routes> 
            {/* 일반 유저용 메인 페이지 */}
            <Route path="/" element={<Main />} />
            {/* 관리자 페이지 (AppAdmin 사용) */}
            {/* <Route path="/admin/*" element={<AppAdmin />} /> */}
          </Routes>
      </div>
  );
};

export default App;
