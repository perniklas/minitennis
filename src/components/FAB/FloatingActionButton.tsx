import './FloatingActionButton.css';

const FloatingActionButton = () => {
    return (
        <div id="floating_action_button">
            <span onClick={() => console.log('yee')}>New</span>
        </div>
    )
};

export default FloatingActionButton;