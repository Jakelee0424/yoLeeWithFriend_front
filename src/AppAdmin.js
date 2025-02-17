
import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/admin/Main.js";
import AdminList from "./pages/admin/admin/AdminList.js";
import AuthorList from "./pages/admin/author/AuthorList.js";
import BannerList from "./pages/admin/banner/BannerList.js";
import BoardList from "./pages/admin/board/BoardList.js";
import LogList from "./pages/admin/log/LogList.js";
import MemberList from "./pages/admin/member/MemberList.js";
import MenuList from "./pages/admin/menu/MenuList.js";
import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("./pages/admin/template/FullLayout.js"));

function AppAdmin () {
  return (
      <div className="AppAdmin">  
          <Routes> 
            <Route path="/" element={<FullLayout />} >
              <Route index element={<Main />} /> {/* 기본 경로 */}
              <Route path="adminMngr" element={<AdminList />} /> {/* /Admin */}
              <Route path="authorMngr" element={<AuthorList />} /> {/* /Author */}
              <Route path="bannerMngr" element={<BannerList />} /> {/* /Banner */}
              <Route path="boardMngr" element={<BoardList />} /> {/* /Board */}
              <Route path="logMngr" element={<LogList />} /> {/* /Log */}
              <Route path="memberMngr" element={<MemberList />} /> {/* /Member */}
              <Route path="menuMngr" element={<MenuList />} /> {/* /Menu */}
            </Route>
          </Routes>
      </div> 
  );
};

export default AppAdmin;
