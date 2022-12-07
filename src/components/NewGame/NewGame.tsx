import { useEffect, useState } from 'react';
import { TbCheck, TbX } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../helpers/firebase';
import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import './NewGame.css';
import NewGameForm from './NewGameForm';

const NewGame = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const createGame = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        console.log('hehe');
        const form = document.getElementById('newgame__form') as HTMLFormElement;
        console.log(form);
        debugger;
        form.submit();
    };

    const backButton = (
        <a href="" onClick={() => navigate('/dashboard')} className="cancel">
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
                    ? <NewGameForm />
                    : <span className="centered">You need to log in</span>
                }
            <BottomNavigationBar
                firstButton={backButton}
                secondButton={createGameButton}
            />
        </div>
    );
};

export default NewGame;