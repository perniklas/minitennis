import { ReactNode } from 'react';

import './BottomNavigationBar.css';

interface customNavigationButtonProps {
    buttons: Array<ReactNode>;
}

const BottomNavigationBar = (props: customNavigationButtonProps) => {
    const { buttons } = props;
    let id = 0;

    return (
        <div id="bottom_navigation_bar">
            {buttons.map(button => {
                id++;
                return (
                    <div className="bottom_navigation_bar__item" key={`bottomnavbaritem-${id}`}>
                        {button}
                    </div>
                );
            })}
        </div>
    )
};

export default BottomNavigationBar;