import { ReactComponent as LogoDark } from "../../../otherLib/bootStrap/assets/images/logos/materialpro.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/admin">
      <LogoDark />
    </Link>
  );
};

export default Logo;
