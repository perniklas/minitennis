import { TbCheck, TbX } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/User';
import { useAppSelector } from '../../Redux/hooks';
import { RootState, store } from '../../Redux/store';
import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import './NewGame.css';
import NewGameForm, { handleSubmit } from './NewGameForm';

const NewGame = () => {
    const navigate = useNavigate();
    const state = store.getState();
    const users = useAppSelector((state: RootState) => state.users);
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
            await handleSubmit(navigate);
            // go to dashboard? any user feedback at all?
            //navigate(-1);
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
        <a onClick={(e) => createGame(e)} className="greenlight">
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
                    <h2>NEW GAME</h2>
                </div>
                {
                    state.loggedIn
                        ? <NewGameForm users={users} />
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