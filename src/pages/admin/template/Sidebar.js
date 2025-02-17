import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../../../otherLib/bootStrap/assets/images/users/user4.jpg";
import probg from "../../../otherLib/bootStrap/assets/images/bg/download.jpg";
import layoutStyle from "../../../style/layout.module.css"

const navigation = [
  {
    title: "회원관리",
    href: "/admin/memberMngr",
    icon: "bi bi-speedometer2",
  },
  {
    title: "관리자관리",
    href: "/admin/adminMngr",
    icon: "bi bi-bell",
  },
  {
    title: "메뉴관리",
    href: "/admin/menuMngr",
    icon: "bi bi-patch-check",
  },
  {
    title: "권한관리",
    href: "/admin/authorMngr",
    icon: "bi bi-columns",
  },
  {
    title: "게시물관리",
    href: "/admin/boardMngr",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "배너관리",
    href: "/admin/bannerMngr",
    icon: "bi bi-card-text",
  },
  {
    title: "로그관리",
    href: "/admin/logMngr",
    icon: "bi bi-columns",
  },
];

const Sidebar = () => {
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
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
