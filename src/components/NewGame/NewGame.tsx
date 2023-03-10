import { TbCheck, TbX } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../Redux/hooks';
import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import './NewGame.css';
import NewGameForm, { handleSubmit } from './NewGameForm';
import { OptionType } from '../Select/Select';

const NewGame = () => {
    const navigate = useNavigate();
    const loggedIn = useAppSelector(state => state.loggedIn);
    const matchOptions: OptionType[] = [
        {
            value: 'singles',
            label: 'Singles'
        },
        {
            value: 'doubles',
            label: 'Doubles'
        }
    ];
    const [matchType, setMatchType] = useState(matchOptions[0]);
    const users = useAppSelector(state => state.users);
    let loading = false;

    try {
        document.getElementById('navigationbutton_newgame').classList.add('active');
    } catch { }

    const createGame = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (loading) {
            alert('Hold your horses lad, we\'re still creating the first game you wanted');
            return;
        }
        try {
            loading = true;
            await handleSubmit(navigate, users, matchType);
            loading = false;
        } catch (e) {
            console.log(e);
            loading = false;
        }
    };

    const backButton = (
        <Link to="/" className="cancel">
            <div>
                <TbX style={{ margin: 'auto' }}></TbX>
            </div>
            <span>
                Cancel
            </span>
        </Link>
    );

    const createGameButton = (
        <a onClick={createGame} className="greenlight">
            <div>
                <TbCheck style={{ margin: 'auto' }}></TbCheck>
            </div>
            <span>
                Create
            </span>
        </a>
    );

    return (
        <div className="home">
            <Header />
            <div style={{ maxWidth: '600px', margin: 'auto' }}>
                <div style={{ padding: "0 1em", margin: 'auto', textAlign: 'center' }}>
                    <h2>REGISTER GAME</h2>
                </div>
                {
                    loggedIn
                        ? <NewGameForm matchType={matchType} setMatchType={setMatchType} matchOptions={matchOptions} />
                        : <div className="centered">
                            <span>You need to log in to create new games.</span>
                        </div>
                }

            </div>
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