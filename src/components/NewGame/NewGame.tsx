import { useEffect, useState } from 'react';
import { TbCheck, TbX } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../helpers/firebase';
import { getUsers } from '../../helpers/firestore';
import { User } from '../../interfaces/User';
import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import './NewGame.css';
import NewGameForm, { handleSubmit } from './NewGameForm';


const NewGame = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(userList => {
            setUsers(userList);
        });
    }, []);

    const createGame = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        handleSubmit();
    };

    const backButton = (
        <a href="" onClick={() => navigate('/')} className="cancel">
            <div>
                <TbX style={{margin: 'auto'}}></TbX>
            </div>
            <span>
                Cancel
            </span>
        </a>
    );

    const createGameButton = (
        <a href="" onClick={(e) => createGame(e)} className="greenlight">
            <div>
                <TbCheck style={{margin: 'auto'}}></TbCheck>
            </div>
            <span>
                Create
            </span>
        </a>
    );

    useEffect(() => {
        const me = auth.currentUser?.uid;
        if (!me) {
            // window.location.replace('/login');
        }

        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    });
    
    return (
        <div id="new_game">
            <Header />
                {
                    loggedIn 
                    ? <NewGameForm users={users}/>
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