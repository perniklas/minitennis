import './Leaderboard.css';
import { truncateName } from '../../helpers/utils';

interface User {
    name: string,
    wins?: number,
    losses?: number,
    rating?: number
};

interface Proppos {
    users: Array<User>;
}

const Leaderboard = (props: Proppos) => {
    const { users } = props;

    users.sort((a: User, b: User) => a.rating > b.rating ? -1 : a.wins > b.wins ? -1 : 1);

    return (
        <table className="leaderboard_users">
            <thead className="leaderboard___tbl_header">
                <tr>
                    <th>Name</th>
                    <th className="centered">W</th>
                    <th className="centered">L</th>
                </tr>
            </thead>
            <tbody className="leaderboard___tbl_content">
                {users.map(user => (
                    <tr key={user.name + "-" + user.wins + "-" + user.losses}>
                        <td>
                            {truncateName(user.name)}
                        </td>
                        <td className="centered">
                            {user.wins ?? "0"}
                        </td>
                        <td className="centered">
                            {user.losses ?? "0"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Leaderboard;