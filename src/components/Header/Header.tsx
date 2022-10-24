import Menu from "./HeaderMenu";
import logo from '../../assets/colored.png';
import { useContext } from "react";
import { Context } from './Provider';

const Header = () => {
  const value = useContext(Context);

  return (
    <header id="header">
      <div id="header_container">
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