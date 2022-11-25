import { auth } from '../../helpers/firebase';
import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import './NewGame.css';

const NewGame = () => {
    const me = auth.currentUser?.uid;
    if (!me) {
        window.location.replace('/login');
    }

    console.log(me);
    return (
        <div id="new_game">
            <Header />
            hehe
            <BottomNavigationBar />
        </div>
    );
};

export default NewGame;