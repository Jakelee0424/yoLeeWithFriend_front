import { ReactComponent as LogoDark } from "../../../otherLib/bootStrap/assets/images/logos/materialpro.svg";
import { Link } from "react-router-dom";

const logo = process.env.PUBLIC_URL+"/asset/images/title.png";
const Logo = () => {
  return (
    <Link to="/admin" style={{paddingBottom:"1%"}}>
      <img src={logo} />
    </Link>
  );
};

export default Logo;
