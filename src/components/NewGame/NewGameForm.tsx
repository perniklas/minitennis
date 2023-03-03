import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import { createMatch } from '../../helpers/firestore';
import { showToast } from "../../App";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface GameProps {
    users: Array<User>;
}

const NewGameForm = (props: GameProps) => {
    const users: User[] = [...props.users];
    let [against, setAgainst] = useState(users[0]);
    users.sort((a: User, b: User) => a.name < b.name ? -1 : 1);
    const navigate = useNavigate();

    const setAvailableWinners = () => {
        const select = (document.getElementById('newgame__form__who') as HTMLSelectElement)
        const id = select.options[select.selectedIndex]?.id;
        if (id) {
            setAgainst(users.find(u => u.id == id));
        }
    };

    useEffect(() => {
        setAvailableWinners();
    }, [users]);

    return (
        <form onSubmit={(e) => handleSubmit(navigate, e)} id="newgame__form">
            {/* <div className="newgame__form__input">
                <label htmlFor="newgame__form__when">When?</label>
                <input id="newgame__form__when" type="datetime-local" defaultValue= />
            </div> */}
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who">You and who?</label>
                <select className="newgame__form__input__input" id="newgame__form__who" onChange={setAvailableWinners}>
                    {users.filter(u => u.id !== auth.currentUser.uid).map((user: User) => {
                        return (
                            <option key={user.id} id={user.id}>{user.name}</option>
                        );
                    })}
                </select>
            </div>

            <div className="newgame__form__input">
                <label htmlFor="newgame__form__winner">Who won?</label>
                <select className="newgame__form__input__input" id="newgame__form__winner">
                    <option id={null}></option>
                    <option id={auth.currentUser?.uid}>Me</option>
                    <option value="against">{against?.name}</option>
                </select>
            </div>
        </form>
    );
};

const handleSubmit = async (navigate, event?: React.FormEvent<HTMLFormElement>) => {
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

export {
    handleSubmit
}

export default NewGameForm;