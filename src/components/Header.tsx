import Menu from "./HeaderMenu";

const Header = () => {


  return (
    <header id="header">
      <div>
        <img src="../assets/colored.png" alt="ping pong logo" id="header_logo"/>
        <h1 id="header_title">
          minitennis
        </h1>
      </div>
      <Menu></Menu>
    </header>
  );
}

export default Header;