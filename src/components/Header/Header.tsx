import Menu from "./HeaderMenu";
import logo from '../../assets/black.svg';
import './Header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header id="header">
      <div id="header_container" onClick={() => navigate("/")}>
        <img src={logo} alt="ping pong logo" id="header_logo"/>
        <h1 id="header_title">
          minitennis
        </h1>
      </div>
      <Menu></Menu>
    </header>
  );
}

export default Header;