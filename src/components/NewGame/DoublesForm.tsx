import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

interface GameProps {
    users: Array<User>;
}

const DoublesGameForm = (props: GameProps) => {
    const users: User[] = [...props.users];
    users.sort((a: User, b: User) => a.name < b.name ? -1 : 1);

    const setAvailableUsers = () => {
        const teammateSelect = (document.getElementById('newgame__form__who') as HTMLSelectElement)
        const teammate = teammateSelect.options[teammateSelect.selectedIndex]?.id;

        const opponent1Select = (document.getElementById('newgame__form__who__opponent1') as HTMLSelectElement)
        const opponent1 = opponent1Select.options[opponent1Select.selectedIndex]?.id;

        const opponent2Select = (document.getElementById('newgame__form__who__opponent2') as HTMLSelectElement)
        const opponent2 = opponent2Select.options[opponent2Select.selectedIndex]?.id;
    };

    useEffect(() => {
        setAvailableUsers();
    }, [props.users]);

    return (
        <div id="newgame__form__singles">
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who">Your teammate?</label>
                <select className="newgame__form__input__input" id="newgame__form__who" onChange={setAvailableUsers}>
                    {users.filter(u => u.id !== auth.currentUser.uid).map((user: User) => {
                        return (
                            <option key={user.id} id={user.id}>{user.name}</option>
                        );
                    })}
                </select>
            </div>

            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who__opponent1">Opponents</label>
                <select className="newgame__form__input__input" id="newgame__form__who__opponent1" onChange={setAvailableUsers}>
                    {users.filter(u => u.id !== auth.currentUser.uid).map((user: User) => {
                        return (
                            <option key={user.id} id={user.id}>{user.name}</option>
                        );
                    })}
                </select>

                <select className="newgame__form__input__input" style={{marginTop: '20px'}} id="newgame__form__who__opponent2" onChange={setAvailableUsers}>
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
                    <option value="us">Us</option>
                    <option value="them">Them</option>
                </select>
            </div>
        </div>
    );
};

export default DoublesGameForm;