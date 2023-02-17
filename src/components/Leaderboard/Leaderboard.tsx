import './Leaderboard.css';
import { truncateName } from '../../helpers/utils';
import { TbCrown } from "react-icons/tb";
import { useAppSelector } from '../../Redux/hooks';
import { User } from '../../interfaces/User';
import { useEffect } from 'react';

const Leaderboard = () => {
    const users = useAppSelector(state => state.users.filter(u => u.losses > 0 || u.wins > 0));
    let leaderboardUsers = [...users];
    leaderboardUsers = leaderboardUsers.sort((a: User, b: User) => (a.rating ?? 0) > (b.rating ?? 0) ? -1 : 1);

    leaderboardUsers.sort((a: User, b: User) => a.rating === b.rating
        ? (a.wins === b.wins ? (a.name > b.name ? -1 : 1) : a.wins > b.wins ? -1 : 1)
        : (a.rating > b.rating ? -1 : 1));

    /*
    * If the ratings're the same, sort by wins.
    * If the wins're the same, sort by name.
    * If the names're the same, go to hell.
    */
    return (
        <div className="leaderboard-wrapper">
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
                    {leaderboardUsers.map((user, index) => (
                        <tr key={user.name + "-" + user.wins + "-" + user.losses}>
                            <td title={(user.name === 'Per-Niklas Longberg' ? 'Legenden Per' : user.name)}>
                                {index == 0 ? <TbCrown style={{ marginRight: '8px', color: 'gold' }} /> : <></>}
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
        </div>
    );
};

export default Leaderboard;