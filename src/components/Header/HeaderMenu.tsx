import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logOutUser } from '../../helpers/firebase';
import "./HeaderMenu.css";
import { users } from '../../helpers/firestore';
import { loggedIn } from '../../helpers/firebase';
import { TbUserPlus } from 'react-icons/tb';

const Menu = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const navigate = useNavigate();

  const setShowMenu = (show: boolean) => {
    setDisplayMenu(show);
  }

  useEffect(() => {
    console.log('logging ' + (loggedIn ? "in" : "out"));
    setDisplayMenu(false);
  }, [loggedIn]);

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
    setShowMenu(false);
  };

  const signUpComp = (
    <button className="button" id="button__signup" onClick={(e) => navigate("/register")}>
      <TbUserPlus /> Register
    </button>
  );

  const signInComp = (
    <button className="button" id="button__login" onClick={(e) => navigate("/login")}>
      ♕ Log in
    </button>
  );

  const signOutComp = (
    <button className="button" id="button__login" onClick={(e) => handleLogOut()}>
      Log out
    </button>
  )

  return (
    <div id="header_menu">
      <button
        id="header_menu_button"
        onClick={() => handleMenuToggle()}
        className="button">
        ☰
        {/* <Hamburger></Hamburger> */}
      </button>
      <div id="header_menu_content" className={displayMenu ? "shown" : ""}>
        <button
          id="header_menu_content_close"
          onClick={() => handleMenuToggle()}
          className={"button" + (displayMenu ? " shown" : "")}>
          ✕
        </button>
        <ul>
          {/* <li>
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
          </li> */}
        </ul>
        <div className="greenlight">
          {loggedIn ? (
            `Hello, ${users.find(u => u.id === auth.currentUser.uid)?.name ?? "Mystery Person"}`
          ) : null}
        </div>
        <div>
          {loggedIn ? null : signUpComp}
          {loggedIn ? signOutComp : signInComp}
        </div>
      </div>
    </div>
  );
};

export default Menu;