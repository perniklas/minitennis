import { faTableTennis } from '@fortawesome/free-solid-svg-icons';
import { TbTournament, TbPlus } from "react-icons/tb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BottomNavigationBar.css';

const BottomNavigationBar = () => {
    function handleBarClick(e: Event) {
        
    }

    return (
        <div id="bottom_navigation_bar">
            <div className="bottom_navigation_bar__item">
                <a href="newtournament">
                    <div>
                        <TbTournament style={{margin: '0 auto'}} />
                        <TbPlus></TbPlus>
                    </div>
                    <span>
                        New tournament
                    </span>
                </a>
                
            </div>
            {/* <div className="bottom_navigation_bar__item">
                <a href="matches">
                    <FontAwesomeIcon icon={faTableTennis} />
                    <span>
                        Matches
                    </span>
                </a>
            </div> */}
            <div className="bottom_navigation_bar__item">
                <a href="newgame">
                    <div>
                        <FontAwesomeIcon icon={faTableTennis} />
                        <TbPlus style={{margin: 'auto'}}></TbPlus>
                    </div>
                    <span>
                        New game
                    </span>
                </a>
            </div>
        </div>
    )
};

export default BottomNavigationBar;