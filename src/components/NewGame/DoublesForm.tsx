import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Select, { OptionType } from "../Select/Select";

interface GameProps {
    users: Array<User>;
}

const DoublesGameForm = (props: GameProps) => {
    const users: User[] = [...props.users].filter(u => u.id != auth.currentUser.uid);
    const [selectedTeammate, setSelectedTeammate] = useState<OptionType>();
    const [selectedOpponents, setSelectedOpponents] = useState<OptionType[]>([]);

    const handleSelectTeammate = (selected: OptionType) => {
        const opponent = selectedOpponents.find(o => o.value === selected.value);
        if (opponent) {
            console.log('ouff');
            setSelectedOpponents([...selectedOpponents.filter(o => o.value !== opponent.value)]);
        }
        setSelectedTeammate(selected);
    };

    const handleSelectOpponents = (selected: OptionType[]) => {
        setSelectedOpponents(selected);
    };

    const options: OptionType[] = users.map(user => {
        return {
            value: user.id,
            label: user.name
        };
    });

    users.sort((a: User, b: User) => a.name < b.name ? -1 : 1);

    useEffect(() => {
        // remove?
    }, [props.users]);

    return (
        <div id="newgame__form__doubles">
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who">Your teammate</label>
                <Select
                    isMulti={false}
                    options={options}
                    value={selectedTeammate}
                    onChange={handleSelectTeammate}
                    placeholder="Select pardner"
                />
            </div>

            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who__opponent1">Opponents</label>
                <Select
                    options={options.filter(o => o.value !== selectedTeammate?.value)}
                    value={selectedOpponents}
                    onChange={handleSelectOpponents}
                    isOptionDisabled={() => selectedOpponents.length >= 2}
                    isMulti={true}
                    placeholder="Select opponents"
                />
                {/* <select className="newgame__form__input__input doublesselector" id="newgame__form__who__opponent1" onChange={setSelectedUsers}>
                    <option id=""></option>
                    {users.map((user: User) => {
                        return (
                            <option key={user.id} id={user.id}>{user.name}</option>
                        );
                    })}
                </select> */}

                {/* <select className="newgame__form__input__input doublesselector" style={{ marginTop: '20px' }} id="newgame__form__who__opponent2" onChange={setSelectedUsers}>
                    <option id=""></option>
                    {users.map((user: User) => {
                        return (
                            <option key={user.id} id={user.id}>{user.name}</option>
                        );
                    })}
                </select> */}
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