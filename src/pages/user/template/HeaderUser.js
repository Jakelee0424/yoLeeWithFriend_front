import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Fetcher from "utils/Fetcher";

const Header = () => {
  const profileImg = process.env.PUBLIC_URL+"/asset/images/profileImg.png";
  let reduxUserInfo = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [getUserNickName, setUserNickName] = useState("");
  const [getProfileImg, setProfileImg] = useState(reduxUserInfo.profilePath ? reduxUserInfo.profilePath : profileImg);
  const { menuTree } = useMenu();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => setIsOpen(!isOpen);
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));

  const normalizePath = (path) => {
    if (!path || typeof path !== 'string') return "";  // 타입 체크까지 추가
    return path.replace(/\\/g, "/");
  };

 


  const resolveImageUrl = (imgUrl) => {
    if (!imgUrl) return profileImg;
    const normalized = normalizePath(imgUrl);
    const publicIndex = normalized.indexOf("public");
    if (publicIndex !== -1) {
      const relativePath = normalized.slice(publicIndex + "public".length);
      return process.env.PUBLIC_URL + relativePath;
    } else {
      const imgIndex = normalized.indexOf("/img");
      if (imgIndex !== -1) {
        const relativeImgPath = normalized.slice(imgIndex);
        return `${relativeImgPath}`;
      } else if (normalized.startsWith("blob:") || normalized.startsWith("data:")) {
        return normalized;
      } else {
        return profileImg;
      }
    }
  };

  // 로그인 유저 정보 함수
  const fetchUserInfo = async () => {
    if (token != null) {
      //console.log(token.accessToken);

      const fetcher = new Fetcher().setUrl("/user/info")
                                         .setMethod("GET")
                                         .setAccessToken(token.accessToken);
      try {
        const result = await fetcher.jsonFetch();
        
        if(result.data){
          if(result.data.status =="ban"){
            alert("로그인이 금지된 계정입니다. 관리자에게 문의해주세요.")
            handleLogout();
          }
          dispatch({type:"PLUS_ONE",payload: result.data})
          setUserNickName(result.data.nickName)
          setProfileImg(result.data.profilePath)
        }else{
          alert("메인으로 돌아갑니다. 다시 로그인을 시도해주세요")
          handleLogout();
        }

      } catch (error) {
        console.error('login error:', error);
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "RESET_USER" });
    navigate("/")
  };

  let navigation = []; 
  if(token){
    navigation = [
      { title: "로그아웃", href: "/login" },
    ];
  }else{
    navigation = [
        { title: "로그인", href: "/login" },
    ];
  }
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
                  style={{ color: "black", fontSize: "clamp(16px, 2vw, 24px)" }} // 24px -> 1.5rem
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

  useEffect(() => {
    fetchUserInfo();
  },[])

  useEffect(() => {
    setUserNickName(reduxUserInfo.nickName)
    setProfileImg(reduxUserInfo.profilePath)
  },[reduxUserInfo])

  useEffect(() => {
          const handleMessage = (event) => {
              if (event.data === "naver_login_success") {
                  window.location.reload();
              }else if(event.data === "kakao_login_success"){
                  window.location.reload();
              }
          };
  
      window.addEventListener("message", handleMessage);

      return () => {
          window.removeEventListener("message", handleMessage);
      };
  }, []);

  useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
  
      // 이벤트 등록
      window.addEventListener("resize", handleResize);
  
      // 컴포넌트 언마운트 시 이벤트 해제
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    useEffect(() => {
      document.body.style.margin = "0";
    },[]);

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
      <div style={{width:"100%", display: windowSize.width > 500 ? "flex" : undefined}}>
        <div className="d-flex align-items-center" style={{width:"100%"}}>
          <NavbarBrand href="/">
            <Logo />
          </NavbarBrand>
        </div>
        <div
          className="hstack gap-2"
          style={{
            width: "100%",
          }}
        >
          <Nav
            className="sidebarNav"
            // style={{ marginLeft: `${Math.max(70 - (menuTree[0]?.children.length) * 15, 0)}%` }}
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
                  style={{ color: "black", fontSize: "clamp(16px, 2vw, 24px)"  }} // 24px -> 1.5rem
                  onClick={e => {
                      if (index === navigation.length - 1) {
                        // 마지막일 경우 클릭 막기
                        e.preventDefault();
                        e.stopPropagation(); // 이벤트 버블링도 막음
                        if(token){
                          handleLogout();
                        }else{
                          handleClick();  
                        }  
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
          className={`hstack gap-2 ${styles.text}`}
          style={{
            border: "white",
            width: "100%",
            paddingLeft: "8%",
            cursor:"pointer"
          }}
          onClick={e => {
            navigate(`/mypage`); 
          }}
        >
          {token ? <img src={resolveImageUrl(getProfileImg)} style={{width:"30px", height:"30px", borderRadius :"50%", overflow:"hidden", marginLeft:"10%"}}/>
          :<></>}
          {token ? getUserNickName : "" }
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
