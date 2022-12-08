import { ReactNode } from 'react';

import './BottomNavigationBar.css';

interface customNavigationButtonProps {
    buttons: Array<ReactNode>;
}

const BottomNavigationBar = (props: customNavigationButtonProps) => {
    const { buttons } = props;

    return (
        <div id="bottom_navigation_bar">
            {buttons.map(button => {
                return (
                    <div className="bottom_navigation_bar__item">
                        {button}
                    </div>
                );
            })}
        </div>
    )
};

export default BottomNavigationBar;