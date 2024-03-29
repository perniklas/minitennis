import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logOutUser } from '../../helpers/firebase';
import "./HeaderMenu.css";
import { TbUserPlus } from 'react-icons/tb';
import { useAppSelector } from '../../Redux/hooks';

const Menu = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const users = useAppSelector(state => state.users);
  const loggedIn = useAppSelector((state) => state.loggedIn);
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();

  const setShowMenu = (show: boolean) => {
    setDisplayMenu(show);
  }

  useEffect(() => {
    console.log('logged ' + (loggedIn ? "in" : "out"));
    setDisplayMenu(false);

    if (!listening) {
      const sidebar = document.querySelector('#header_menu_content');

      if (sidebar instanceof HTMLElement) {
        const updateHeight = () => {
          const height: number = window.innerHeight;
          sidebar.style.height = `calc(${height}px - 1.5rem)`;
        }

        updateHeight();
        window.addEventListener('resize', updateHeight);
      }
    }
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
  );

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

document.addEventListener("click", (event: any) => {
  if (event.target.closest("#header_menu_content") || event.target.closest('#header_menu_button')) {
    return;
  }
  document.getElementById('header_menu_content')?.classList.remove('shown');
});

export default Menu;