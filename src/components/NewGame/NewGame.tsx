import { TbCheck, TbX } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/User';
import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import './NewGame.css';
import NewGameForm, { handleSubmit } from './NewGameForm';
import { loggedIn } from '../../helpers/firebase';

interface GameProps {
    users: Array<User>;
}

const NewGame = (props: GameProps) => {
    const navigate = useNavigate();
    const users = props.users;

    try {
        document.getElementById('navigationbutton_newgame').classList.add('active');
    } catch { }


    const createGame = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        handleSubmit();
        // go to dashboard? any user feedback at all?
    };

    const backButton = (
        <a href="" onClick={() => navigate('/')} className="cancel">
            <div>
                <TbX style={{ margin: 'auto' }}></TbX>
            </div>
            <span>
                Cancel
            </span>
        </a>
    );

    const createGameButton = (
        <a href="" onClick={(e) => createGame(e)} className="greenlight">
            <div>
                <TbCheck style={{ margin: 'auto' }}></TbCheck>
            </div>
            <span>
                Create
            </span>
        </a>
    );

    return (
        <div id="new_game">
            <Header />
            <div style={{padding: "0 1em"}}>
                <h2>NEW GAME</h2>
            </div>
            {
                loggedIn
                    ? <NewGameForm users={users} />
                    : <div className="centered">
                        <span>You need to log in to create new games.</span>
                    </div>
            }
            
            <BottomNavigationBar
                buttons={[
                    backButton,
                    createGameButton
                ]}
            />
        </div>
    );
};

export default NewGame;