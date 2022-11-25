import { onAuthStateChanged, signOut } from 'firebase/auth';
import Hamburger from 'hamburger-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserSettings.context';
import { auth, logOutUser } from '../../helpers/firebase';
import "./HeaderMenu.css";

const Menu = () => {
  const userContext = useContext(UserContext);
  const [signedIn, setSignedIn] = useState(false);
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

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log('authstate changed');
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  });
  
  const signInComp = (
    <button className="button" id="button__login" onClick={(e) => navigate("/login")}>
      ♕ Log in
    </button>
  );

  const signOutComp = (
    <button className="button" id="button__login" onClick={(e) => handleLogOut()}>
      ♕ Log out
    </button>
  )

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
          <div>
            {signedIn ? signOutComp : signInComp}
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Menu;