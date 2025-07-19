import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../../../otherLib/bootStrap/assets/images/users/user4.jpg";
import probg from "../../../otherLib/bootStrap/assets/images/bg/download.jpg";
import layoutStyle from "../../../style/layout.module.css"
import { useMenu } from "contexts/MenuContext";

const Sidebar = () => {
  const { menuTree } = useMenu();

  const renderMenuItem = (menuTree) => {
    return menuTree.map(menu => (
            <NavItem key={menu.menuNo} className="sidenav-bg">
              <Link
                to={menu.url}
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
          ))
  }

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
