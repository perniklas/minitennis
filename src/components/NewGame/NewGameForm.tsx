import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import { createMatch } from '../../helpers/firestore';
import { showToast } from "../../App";
import 'react-toastify/dist/ReactToastify.css';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/hooks";
import SinglesGameForm from "./SinglesForm";
import DoublesGameForm from "./DoublesForm";

enum MatchType {
    singles,
    doubles
}

const NewGameForm = () => {
    const users: User[] = useAppSelector(state => state.users);
    let sortedUsers: User[] = [];
    const [matchType, setMatchType] = useState(MatchType.singles);
    const navigate = useNavigate();

    useEffect(() => {
        sortedUsers = [...users].sort((a: User, b: User) => a.name < b.name ? -1 : 1);
        console.log('sorted');
        console.log(sortedUsers);
    }, [matchType, users]);

    const setGameType = () => {
        const select = (document.getElementById('newgame__form__type') as HTMLSelectElement)
        const gameTypeString = select.options[select.selectedIndex]?.value;
        if (gameTypeString) {
            const gameType = MatchType[gameTypeString];
            setMatchType(gameType);
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(navigate, e)} id="newgame__form">
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__type">Game type</label>
                <select className="newgame__form__input__input" id="newgame__form__type" onChange={setGameType}>
                    <option value='singles'>Singles</option>
                    <option value='doubles'>Doubles</option>
                </select>
            </div>
            { 
                matchType === MatchType.singles
                ? <SinglesGameForm users={sortedUsers} />
                : <DoublesGameForm users={sortedUsers} />
            }
        </form>
    );
};

export const handleSubmit = async (navigate: NavigateFunction, event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    if (!auth.currentUser?.uid) {
        window.location.href = "/login";
        return;
    }

    const who = document.getElementById('newgame__form__who') as HTMLSelectElement;
    if (!who) {
        alert('You gotta choose someone bruh');
    }

    const whoID = who.children[who.selectedIndex]?.id;
    await createMatch(whoID);
    who.value = '';
    showToast();
    navigate('/');
};

export default NewGameForm;