import {React, useEffect, useState, lazy, Suspense} from "react";
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import * as menuService from "service/common/menuService";
/* 컴포넌트 import */
import Main from "./pages/Main";
import Test from "pages/user/test/Test";
import IPBlockProtectedRoute from "pages/user/util/IPBlockProtectedRoute";
import FullLayoutUser from "pages/user/template/FullLayoutUser";
import { MenuContext } from "contexts/MenuContext.js";
import LogInsertRoute from "pages/user/util/LogInsertRoute";

// 프로젝트 파일구조에서 특정 js 화면을 추출하기 위한 modules 변수
const modules = require.context("./pages/user", true, /\.js$/);

function App () {
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
    getMenuList(8);
  }, []);

  return (
      <MenuContext.Provider value={{menuTree, reloadMenu: () => getMenuList(8)}}>
        <div className="app" style={{width:"100%", height:"100%"}}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>   
              <Route element={<LogInsertRoute />}>
              {/* 일반 유저용 메인 페이지 */}
                <Route path="/" element={ <FullLayoutUser /> }> {/* 기본 경로 */}
                  {/* 보호 라우트 그룹 */}
                  <Route element={<IPBlockProtectedRoute />}>
                    <Route path="/test" element={<Test />} /> {/* /test */}
                    {routes}
                  </Route>
                  <Route index element={<Main />} /> {/* 기본 경로 */}  
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </div>
      </MenuContext.Provider>
  );
};

export default App;

// ==================== 헬퍼 함수 ====================
function buildRouteList(menuTree) {
  const result = [];

  const traverse = (menus) => {
    menus.forEach((menu) => {
      const { url, menuNo, componentFileNm } = menu;

      if (componentFileNm) {
        // 실제 컴포넌트를
        const matchedKey = modules.keys().find((k) => k.endsWith(`/${componentFileNm}`));
        if (matchedKey) {
          const Component = lazy(() => Promise.resolve(modules(matchedKey)));
          result.push(
            <Route key={menuNo} path={url} element={<Component />} />
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