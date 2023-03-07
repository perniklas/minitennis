import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

interface GameProps {
    users: Array<User>;
}

const DoublesGameForm = (props: GameProps) => {
    const users: User[] = [...props.users];
    let [against, setAgainst] = useState(users[0]);
    users.sort((a: User, b: User) => a.name < b.name ? -1 : 1);

    const setAvailableWinners = () => {
        const select = (document.getElementById('newgame__form__who') as HTMLSelectElement)
        const id = select.options[select.selectedIndex]?.id;
        if (id) {
            setAgainst(users.find(u => u.id == id));
        }
    };

    useEffect(() => {
        setAvailableWinners();
    }, [props.users]);

    return (
        <div id="newgame__form__singles">
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
        </div>
    );
};

export default DoublesGameForm;