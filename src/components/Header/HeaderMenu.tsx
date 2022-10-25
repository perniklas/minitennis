import Hamburger from 'hamburger-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from '../../Context/Auth.context';
import UserContext from '../../Context/UserSettings.context';
import { logOutUser } from '../../helpers/firebase';
import "./HeaderMenu.css";

const Menu = () => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const [displayMenu, setDisplayMenu] = useState(false);
  const navigate = useNavigate();

  const setShowMenu = (show: boolean) => {
    userContext.showMenu = show;
    setDisplayMenu(show);
  }

  const handleMenuToggle = () => {
    const elem = document.getElementById('header_menu_content');
    if (elem?.classList.contains('shown')) {
      elem!.classList.remove("shown");
      setShowMenu(false)
    } else {
      elem!.classList.add("shown");
      setShowMenu(true);
    }
  };

  const handleLogOut = async () => {
    console.log('logging out');
    await logOutUser();
  };

  console.log(authContext);

  return (
    <UserContext.Provider value={{ showMenu: userContext.showMenu }}>
      <div id="header_menu">
        <button
          id="header_menu_button"
          onClick={() => handleMenuToggle()}
          className="button">
          ☰
          {/* <Hamburger></Hamburger> */}
        </button>
        <div id="header_menu_content" className={userContext.showMenu ? "shown" : ""}>
          <button
            id="header_menu_content_close"
            onClick={() => handleMenuToggle()}
            className={"button" + (userContext.showMenu ? " shown" : "")}>
            ✕
          </button>
          <ul>
            <li>
              <a href="#">Menu item</a>
            </li>
            <li>
              <a href="#">Menu item 55</a>
            </li>
            <li>
              <a href="#">Menu item 2</a>
            </li>
            <li>
              <a href="#">Benu bitem b3</a>
            </li>
          </ul>
          <AuthContextProvider value={{ isLoggedIn: authContext.isLoggedIn }}>
            {authContext.isLoggedIn ?
              <div>
                <button className="button" id="button__login" onClick={(e) => navigate("/login")}>
                  ♕ Log in
                </button>
              </div> :
              <button className="button" id="button__login" onClick={(e) => handleLogOut()}>
                ♕ Log out
              </button>
            }
          </AuthContextProvider>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Menu;