import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link className="header__link" to="/systeme-task">
        Main/Pages
      </Link>
      <Link className="header__link" to="/systeme-task/prices">
        Prices
      </Link>
      <Link className="header__link" to="/systeme-task/products">
        Products
      </Link>
      <Link className="header__link" to="/systeme-task/my-own">
        Test
      </Link>
    </div>
  );
};

export default Header;
