import { auth } from "../../helpers/firebase";
import { User } from "../../interfaces/User";
import { createMatch } from '../../helpers/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer position='bottom-center'/>
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
    const notify = () => toast.success(`Game created!`);
    if (!who) {
        alert('You gotta choose someone bruh');
    }

    const whoID = who.children[who.selectedIndex]?.id;
    await createMatch(whoID);
    who.value = '';
    notify();
};

export {
    handleSubmit
}

export default NewGameForm;