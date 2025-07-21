import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
} from "reactstrap";
import Logo from "pages/admin/template/Logo";
import styles from '../../../style/font.module.css';
import { useMenu } from "contexts/MenuContext";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { menuTree } = useMenu();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => setIsOpen(!isOpen);
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const token = sessionStorage.getItem("accessToken");
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/admin/login");
  };
  let location = useLocation();

  const navigation = [
    { title: "로그인", href: "/login" },
  ];
  // 메뉴 랜더링 함수
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
                <span
                  className={`ms-3 d-inline-block ${styles.text}`}
                  style={{ color: "black", fontSize: "1.5rem" }} // 24px -> 1.5rem
                >
                  {menu.menuNm}
                </span>
              </Link>
            </NavItem>
          ))
  }

  const handleClick = () =>{
    const popup = window.open(
      '/login', // 경로 (리액트 라우터가 처리해야 함)
      'popupWindow',
      'width=600,height=600,resizable=yes,scrollbars=yes'
    );

    // 팝업에 포커스
    if (popup) popup.focus();
  }

  return (
    <Navbar
      style={{
        width: "80rem",  // 1280px 기준 고정 너비
        maxWidth: "100%",
        margin: "0 auto",
        height: "9rem",  // 144px
      }}
      dark
      expand="md"
      className="fix-header"
    >
      <div className="d-flex align-items-center">
        <NavbarBrand href="/">
          <Logo />
        </NavbarBrand>
      </div>
      <div
        className="hstack gap-2"
        style={{
          width: "85%",
          height: "5rem", // 80px
        }}
      >
        <Nav
          className="sidebarNav"
          style={{ marginLeft: `${Math.max(82 - (menuTree[0]?.children.length) * 15, 0)}%` }}
        >
          {renderMenuItem(menuTree[0]?.children || [])}
          {navigation.map((navi, index) => (
          <NavItem key={index} className="sidenav-bg">
            <Link
              className={
                location.pathname === navi.href
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <span
                className={`ms-3 d-inline-block ${styles.text}`}
                style={{ color: "black", fontSize: "1.5rem" }} // 24px -> 1.5rem
                 onClick={e => {
                    if (index === navigation.length - 1) {
                      // 마지막일 경우 클릭 막기
                      e.preventDefault();
                      e.stopPropagation(); // 이벤트 버블링도 막음
                      handleClick();
                    } else {
                      // 원하는 동작
                      navigate(`${navi.href}`); // 예시: React Router로 이동
                    }
                  }}
              >
                {navi.title}
              </span>
            </Link>
          </NavItem>
             ))}
        </Nav>
      </div>
      <div
        className="hstack gap-2"
        style={{
          border: "white",
          width: "15%",
          height: "5rem", // 80px
        }}
      ></div>
    </Navbar>
  );
};

export default Header;
