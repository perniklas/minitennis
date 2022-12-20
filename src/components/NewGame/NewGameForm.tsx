import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import { createMatch } from '../../helpers/firestore';

interface GameProps {
    users: Array<User>;
}

const NewGameForm = (props: GameProps) => {
    return (
        <form onSubmit={handleSubmit} id="newgame__form">
            {/* <div className="newgame__form__input">
                <label htmlFor="newgame__form__when">When?</label>
                <input id="newgame__form__when" type="datetime-local" defaultValue= />
            </div> */}
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who">You and who?</label>
                <select id="newgame__form__who">
                    {props.users.filter(u => u.id !== auth.currentUser.uid).map((user: User) => {
                        return (
                            <option key={user.id} id={user.id}>{user.name}</option>
                        );
                    })}
                </select>
            </div>
        </form>
    );
};

const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
        event.preventDefault();
    }

    if (!auth.currentUser?.uid) {
        window.location.href = "/login";
        return;
    }

    const who = document.getElementById('newgame__form__who') as HTMLSelectElement;
    if (!who) {
        alert('You gotta choose someone bruh');
    }

    const whoID = who.children[who.selectedIndex]?.id;

    const whoName = who.value;
    console.log(whoID, whoName);
    await createMatch(whoID);
};

export {
    handleSubmit
}

export default NewGameForm;