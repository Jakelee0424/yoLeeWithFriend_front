import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../../../otherLib/bootStrap/assets/images/logos/materialprowhite.svg";
import user1 from "../../../otherLib/bootStrap/assets/images/users/user4.jpg";
import Logo from "pages/admin/template/Logo";



const Header = () => {


  
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const token = sessionStorage.getItem("accessToken");

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken"); // 토큰 삭제
    navigate("/admin/login"); // 로그인 페이지로 이동
  };

  let location = useLocation();

  const navigation = [
  {
    title: "상세",
    href: "/board/detail",
  },
  {
    title: "비교",
    href: "/board/versus",
  },
  {
    title: "로그인",
    href: "/admin/memberMngr",
  },
];
  
  return (
    <Navbar style={{width:"83%", margin:"0 auto", height:"15rem"}} dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/">
          <Logo url={"/"} />
        </NavbarBrand>
      </div>
      <div className="hstack gap-2" style={{
        width:"85%"
        ,height:"5rem"
      }}>
        <Nav  className="sidebarNav" style={{marginLeft:`${Math.max(85 - (navigation.length - 1) * 15, 0)}%`}}>
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
                <span className="ms-3 d-inline-block" style={{color:"black"}}>{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
      <div className="hstack gap-2" style={{border:"white"
        ,width:"15%"
        ,height:"5rem"
      }}>
        
      </div>
    </Navbar>
  );
};

export default Header;
