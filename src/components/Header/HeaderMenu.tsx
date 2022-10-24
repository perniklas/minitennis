import Hamburger from 'hamburger-react';
import { useContext, useState } from 'react';
import UserContext from '../../Context';

const Menu = () => {
  const ctx = useContext(UserContext);
  const [displayMenu, setDisplayMenu] = useState(false);

  const setShowMenu = () => {
    const elem = document.getElementById('header_menu_content');
    const show = !elem?.classList.contains('shown') ?? false;
    console.log(elem, show);
    if (elem) {
      if (show) {
        elem!.classList.remove("shown");
      } else {
        elem!.classList.add("shown");
      }
    }
    ctx.showMenu = show;
    setDisplayMenu(show);
  };

  return (
    <UserContext.Provider value={{showMenu: ctx.showMenu}}>
      <div id="header_menu">
        <button 
          id="header_menu_button"
          onClick={() => setShowMenu()}
          className="button">
            ☰
          {/* <Hamburger></Hamburger> */}
        </button>
        <div id="header_menu_content" className={ctx.showMenu ? "shown" : ""}>
          <button 
            id="header_menu_content_close"
            onClick={() => setShowMenu()}
            className="button">
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
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Menu;