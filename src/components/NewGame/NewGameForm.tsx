import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import { createSinglesMatch, MatchResults } from '../../helpers/firestore';
import { showToast } from "../../App";
import 'react-toastify/dist/ReactToastify.css';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../Redux/hooks";
import SinglesGameForm from "./SinglesForm";
import DoublesGameForm from "./DoublesForm";
import Select, { OptionType } from "../Select/Select";

interface NewGameProps {
    matchType: OptionType;
    setMatchType: Function;
    matchOptions: OptionType[];
}

const NewGameForm = (props: NewGameProps) => {
    const users: User[] = useAppSelector(state => state.users);
    const { matchType, setMatchType, matchOptions } = props;
    const navigate = useNavigate();

    useEffect(() => {
        // remove?
    }, [matchType]);

    const setGameType = (selected: OptionType) => {
        setMatchType(selected);
    }

    return (
        <form onSubmit={(e) => handleSubmit(navigate, users, matchType, e)} id="newgame__form">
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__type">Game type</label>
                {/* <Select
                    id='singles_match_opponent'
                    value={matchType}
                    options={matchOptions}
                    onChange={setGameType}
                    placeholder='Match type'
                /> */}
            </div>
            {
                matchType.value === 'singles'
                    ? <SinglesGameForm users={users} />
                    : <DoublesGameForm users={users} />
            }
        </form>
    );
};

export const handleSubmit = async (navigate: NavigateFunction, users: User[], matchType: OptionType, event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    if (!auth.currentUser?.uid) {
        window.location.href = "/login";
        return;
    }

    if (matchType.value === 'singles') {
        const opponent = document.getElementById('singles_match_opponent') as HTMLSelectElement;
        debugger;
    } else {

    }

    return;
    

    ////////

    const who = document.getElementById('newgame__form__who') as HTMLSelectElement;
    if (!who) {
        alert('You gotta choose someone bruh');
        return;
    }

    const whoID = who.children[who.selectedIndex]?.id;
    const winnerElement = document.getElementById('newgame__form__winner') as HTMLSelectElement;
    const winnerID = winnerElement.options[winnerElement.selectedIndex].id;

    const scores = document.getElementsByClassName('newgame_score');
    let score1 = parseInt((scores.item(0) as HTMLInputElement).value);
    let score2 = parseInt((scores.item(1) as HTMLInputElement).value);

    if ((score1 && !score2) || (score2 && !score1) || (score1 < 0 || score2 < 0)) {
        alert('Something\'s off with those scores.');
        return;
    }

    if ((score1 || score2) && !winnerID) {
        alert('You can\'t have a score, and not a winner. It just doesn\'t work like that.');
        return;
    }

    if (!winnerID) {
        alert('Someone has to have won, that\'s kind of the point of playing. Come on, select a winner.');
        return;
    }

    let results: MatchResults;
    if (winnerID) {
        const winnerScore = score1 > score2 ? score1 : score2;
        const loserScore = score1 > score2 ? score2 : score1;
        let winner: User;
        let loser: User;
        if (auth.currentUser.uid === winnerID) {
            winner = users.find(u => u.id === auth.currentUser.uid);
            loser = users.find(u => u.id === whoID);
        } else {
            winner = users.find(u => u.id === whoID);
            loser = users.find(u => u.id === auth.currentUser.uid);
        }

        results = {
            winner,
            loser,
            scores: {
                winner: winnerScore,
                loser: loserScore
            }
        };
    }

    await createSinglesMatch(whoID, results);
    who.value = '';
    showToast();
    navigate('/');
};

function handleSinglesGame() {
    
}

function handleDoublesGame() {
    
}

export default NewGameForm;