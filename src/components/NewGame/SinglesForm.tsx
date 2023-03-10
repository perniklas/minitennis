import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Select, { OptionType } from "../Select/Select";

interface GameProps {
    users: Array<User>;
}

const SinglesGameForm = (props: GameProps) => {
    const users: User[] = [...props.users].filter(u => u.id !== auth.currentUser.uid)
        .sort((a: User, b: User) => a.name < b.name ? -1 : 1);
    const [against, setAgainst] = useState(users[0]);
    const options: OptionType[] = users.map(user => {
        return {
            value: user.id,
            label: user.name
        };
    });


    const setAvailableWinners = (selected: OptionType) => {
        const id = selected.value;
        if (id) {
            setAgainst(users.find(u => u.id == id));
        }
    };

    useEffect(() => {
        setAvailableWinners(options[0]);
    }, [props.users]);

    return (
        <div id="newgame__form__singles">
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who">You and who?</label>
                <Select
                    id="newgame__form__who"
                    options={options}
                    value={options[0]}
                    placeholder='Select opponent'
                    isMulti={false}
                    onChange={setAvailableWinners}
                />
            </div>

            <div className="newgame__form__input">
                <label htmlFor="newgame__form__winner">Who won? <span style={{ float: "right" }}>(optional)</span></label>
                <Select
                    id="newgame__form__who_won"
                    options={[
                        {
                            value: auth.currentUser.uid,
                            label: 'Me'
                        },
                        {
                            value: against.id,
                            label: against.name
                        }
                    ]}
                    value={
                        {
                            value: auth.currentUser.uid,
                            label: 'Me'
                        }
                    }
                    placeholder='Who won?'
                />
            </div>

            <div className="newgame__form__input row">
                <div className="newgame__form__input__row">
                    <label htmlFor="newgame__form__points__1">Score</label>
                    <input className="newgame__form__input__input newgame_score" id="newgame__form__points__1" type="number" />
                </div>
                <div className="newgame__form__input__row">
                    <label htmlFor="newgame__form__points__2">(optional)</label>
                    <input className="newgame__form__input__input newgame_score" id="newgame__form__points__2" type="number" />
                </div>
            </div>
        </div>
    );
};

export default SinglesGameForm;