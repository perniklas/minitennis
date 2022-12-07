import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";

interface GameProps {
    users: Array<User>;
}

const NewGameForm = (props: GameProps) => {
    return (
        <form onSubmit={handleSubmit} id="newgame__form">
            <div className="newgame__form__input">
                <label htmlFor="newgame__form__who">You and who?</label>
                {/* <input id="newgame__form__who" defaultValue="test" /> */}
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

const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
        event.preventDefault();
    }

    if (!auth.currentUser?.uid) {
        window.location.href = "/login";
        return;
    }

    const who = document.getElementById('newgame__form__who') as HTMLInputElement;
    if (!who) {
        alert('You gotta choose someone bruh');
    }

    const whoID = who.value;
    console.log(whoID);
};

export {
    handleSubmit
}

export default NewGameForm;