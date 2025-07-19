
import {React, useEffect, useState, lazy, Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import * as menuService from "service/admin/menu/menuService";
/* 컴포넌트 import */
import Main from "./pages/admin/Main.js";
import Login from "./pages/admin/login/Login.js";
import BoardView from "./pages/admin/board/BoardView.js";
import ProtectedRoute from "utils/login/ProtectedRoute.jsx";
import { MenuContext } from "contexts/MenuContext.js";

/****Layouts*****/
const FullLayout = lazy(() => import("./pages/admin/template/FullLayout.js"));
// 프로젝트 파일구조에서 특정 js 화면을 추출하기 위한 modules 변수
const modules = require.context("./pages/admin", true, /\.js$/);

function AppAdmin () {
  // 메뉴 context 설정을 위한 useState
  const [menuTree, setMenuTree]  = useState([]);
  // 동적으로 메뉴목록을 import 하기 위한 useState
  const [routes, setRoutes] = useState([]);

  const getMenuList = async (menuNo) => {
    const result = await menuService.fetcherGetMenuList(menuNo);
    const menuList = result.data;
    
    const routes = buildRouteList(menuList);
    setRoutes(routes);
    setMenuTree(menuList);
  };

  useEffect(() => {
    getMenuList(1);
  }, []);

  return (
      <MenuContext.Provider value={{menuTree, reloadMenu: () => getMenuList(1)}}>
        <div className="AppAdmin">  
            <Suspense fallback={<div>Loading...</div>}>
              <Routes> 
                {/* 로그인 안 해도 접근 가능 */}
                <Route path="login" element={<Login />} /> {/* /Login */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <FullLayout />
                  </ProtectedRoute>
                  } >
                  <Route index element={<Main />} /> {/* 기본 경로 */}
                  <Route path="boardView/:id" element={<BoardView />} /> {/* /Board 상세 */}
                  {routes}
                </Route>
              </Routes>
            </Suspense>
        </div>
      </MenuContext.Provider>
  );
};

export default AppAdmin;

// ==================== 헬퍼 함수 ====================

function buildRouteList(menuTree) {
  const result = [];

  const traverse = (menus) => {
    menus.forEach((menu) => {
      const { url, menuNo, componentFileNm } = menu;

      if (url?.startsWith("/admin") && componentFileNm) {
        // 화면이동에 사용할 url 세팅
        const path = url.replace("/admin/", "");
        // 실제 컴포넌트를
        const matchedKey = modules.keys().find((k) => k.endsWith(`/${componentFileNm}`));
        if (matchedKey) {
          const Component = lazy(() => Promise.resolve(modules(matchedKey)));
          result.push(
            <Route key={menuNo} path={path} element={<Component />} />
          );
        }
      }

      if (menu.children?.length > 0) {
        traverse(menu.children);
      }
    });
  };

  traverse(menuTree);
  return result;
}