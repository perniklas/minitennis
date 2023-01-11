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
                    <th title="Come on, you know what this is">Name</th>
                    <th className="centered" title="Wins">W</th>
                    <th className="centered" title="Losses">L</th>
                    <th className="centered" title="Rating">R</th>
                </tr>
            </thead>
            <tbody className="leaderboard___tbl_content">
                {users.map(user => (
                    <tr key={user.name + "-" + user.wins + "-" + user.losses}>
                        <td title={user.name}>
                            {truncateName(user.name)}
                        </td>
                        <td className="centered">
                            {user.wins ?? "0"}
                        </td>
                        <td className="centered">
                            {user.losses ?? "0"}
                        </td>
                        <td className="centered" title={`${user.rating.toFixed(3)}`}>
                            {user.rating?.toFixed(0) ?? "1000"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Leaderboard;