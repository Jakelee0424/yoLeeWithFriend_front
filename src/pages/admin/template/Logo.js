import { ReactComponent as LogoDark } from "../../../otherLib/bootStrap/assets/images/logos/materialpro.svg";

const logo = process.env.PUBLIC_URL+"/asset/images/title.png";
const Logo = () => {
  return (
      <img style={{width:"100%"}} src={logo} />
  );
};

export default Logo;
