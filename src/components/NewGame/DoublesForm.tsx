import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

interface GameProps {
    users: Array<User>;
}

const DoublesGameForm = (props: GameProps) => {
    const users: User[] = [...props.users].filter(u => u.id != auth.currentUser.uid);
    users.sort((a: User, b: User) => a.name < b.name ? -1 : 1);

    const setSelectedUsers = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        const selectedIndex = element.selectedIndex;
        const selectedUserID = element.options[element.selectedIndex].id;
        const selects = document.getElementsByClassName('doublesselector');

        for (let i = 0; i < selects.length; i++) {
            const elem = selects.item(i) as HTMLSelectElement;
            const id = elem.options[elem.selectedIndex].id;
            if (id != '' && id == selectedUserID) {
                elem.selectedIndex = 0;
            }
        }

        element.selectedIndex = selectedIndex;
    };

    useEffect(() => {
        //setSelectedUsers();
    }, [props.users]);

    return (
        <div id="newgame__form__doubles">
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who">Your teammate</label>
                <select className="newgame__form__input__input doublesselector" id="newgame__form__who" onChange={setSelectedUsers}>
                    <option id=""></option>
                    {users.map((user: User) => {
                        return (
                            <option key={user.id} id={user.id}>{user.name}</option>
                        );
                    })}
                </select>
            </div>

            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who__opponent1">Opponents</label>
                <select className="newgame__form__input__input doublesselector" id="newgame__form__who__opponent1" onChange={setSelectedUsers}>
                    <option id=""></option>
                    {users.map((user: User) => {
                        return (
                            <option key={user.id} id={user.id}>{user.name}</option>
                        );
                    })}
                </select>

                <select className="newgame__form__input__input doublesselector" style={{ marginTop: '20px' }} id="newgame__form__who__opponent2" onChange={setSelectedUsers}>
                    <option id=""></option>
                    {users.map((user: User) => {
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