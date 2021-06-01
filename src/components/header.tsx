import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import nomadLogo from "../images/nomadLogo.jpg";

export const Header: React.FC = () => {
  return (
    <header className="py-4 bg-black">
      <div className="w-full  px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to='/'>
        <img src={nomadLogo} className="w-9" alt="Nomadland" />
        </Link>
        <span className="text-xs">
          <Link to="/edit-profile">
            <FontAwesomeIcon icon={faUser} className="text-xl text-white" />
          </Link>
        </span>
      </div>
    </header>
  );
};
