import { ReactNode } from 'react';

import './BottomNavigationBar.css';

interface customNavigationButtonProps {
    firstButton: ReactNode;
    secondButton: ReactNode;
}

const BottomNavigationBar = (props: customNavigationButtonProps) => {
    function handleBarClick(e: Event) {
        
    }

    const { firstButton, secondButton } = props;

    return (
        <div id="bottom_navigation_bar">
            <div className="bottom_navigation_bar__item">
                {firstButton}
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
                {secondButton}
            </div>
        </div>
    )
};

export default BottomNavigationBar;