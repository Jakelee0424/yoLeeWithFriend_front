import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user1 from "../../../otherLib/bootStrap/assets/images/users/user4.jpg";
import probg from "../../../otherLib/bootStrap/assets/images/bg/download.jpg";
import layoutStyle from "../../../style/layout.module.css"
import { useMenu } from "contexts/MenuContext";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const { menuTree } = useMenu();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  // 메뉴 렌더링 함수
  const renderMenuItem = (menuTree) => {


  return menuTree.map((menu) => {
          const handleClick = (e) => {
            // 조건 분기: 특정 메뉴일 때만 특별 동작 수행
            if (menu.menuNo === 5 || menu.menuNo === 14 || menu.menuNo === 15) {
              e.preventDefault(); // Link 이동 막기
              dispatch({ type: "searchClear" });
              navigate(`${menu.url}`);
            }
          };

          return (
            <NavItem key={menu.menuNo} className="sidenav-bg">
              <Link
                to={menu.url}
                onClick={handleClick}
                className={
                  location.pathname === menu.url
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className="bi bi-speedometer2"></i>
                <span className="ms-3 d-inline-block">{menu.menuNm}</span>
              </Link>
            </NavItem>
          );
        });
    };

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">Steave Rojer</div>
      </div>
      <div className={layoutStyle.sidebarContainer} >
        <Nav vertical className="sidebarNav">
          {renderMenuItem(menuTree[0]?.children || [])}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
