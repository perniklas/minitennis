import { getDashboardOverview } from '../../helpers/firestore';
import { useEffect, useState } from 'react';
import './Dashboard.css';
import Loading from '../Loading/Loading';
import DataContext from '../../Context/Data.context';

interface User {
    name: string,
    wins?: number,
    losses?: number,
    rating?: number
};

interface Match {
    participants: Array<User>;
    winner?: User;
    timestamp?: Date;
}

interface Tournament {
    participants: Array<User>;
    brackets?: Array<Match>;
    matches?: Array<Match>;
    winner?: User;
    timestamp?: Date;
}

const Dashboard = () => {
    const [users, setUsers] = useState<Array<User>>([]);
    const [matches, setMatches] = useState<Array<Match>>([]);
    const [tournaments, setTournaments] = useState<Array<Tournament>>([]);
    const [loading, setLoading] = useState(true);

    let data: any = {};
    
    useEffect(() => {
        getDashboardOverview().then(response => {
            const { loadedUsers, loadedMatches, loadedTournaments } = response;

            loadedUsers.sort((a: User, b: User) => ((a.wins ?? 0) > (b.wins ?? 0)) ? -1 : 1);
            setUsers(loadedUsers);

            loadedMatches.sort((a: Match, b: Match) => ((a.timestamp ?? 0) > (b.timestamp ?? 0)) ? -1 : 1);
            setMatches(loadedMatches);

            loadedTournaments.sort((a: Tournament, b: Tournament) => ((a.timestamp ?? 0) > (b.timestamp ?? 0)) ? -1 : 1);
            setMatches(loadedTournaments);

            data.users = loadedUsers;
            data.matches = loadedMatches;
            data.tournaments = loadedTournaments;

            setLoading(false);
        });
    }, []);

    const truncateName = (name: string) => {
        if (name.length > 10) {
            let names = name.split(" ");
            let firstName = names[0];
            let lastNames = names.map((lName, index) => {
                if (index > 0) {
                    return lName.substring(0, 1) + ".";
                }
            }).join("");

            if (firstName.length > 10) {
                return firstName.substring(0, 10) + "...";
            }

            return firstName + " " + lastNames;
        }

        return name;
    }

    if (loading) {
        return <Loading message="Loading users..."></Loading>;
    }

    return (
        <DataContext.Provider value={data}>
            <div id="dashboard">
                <section id="dashboard__top">
                    <h1>Top players</h1>
                    <table className="users">
                        <thead className="tbl-header">
                            <tr>
                                <th>Name</th>
                                <th>W</th>
                                <th>L</th>
                            </tr>
                        </thead>
                        <tbody className="tbl-content">
                            {users.map(user => (
                                <tr key={user.name + "-" + user.wins + "-" + user.losses}>
                                    <td>
                                        {truncateName(user.name)}
                                    </td>
                                    <td>
                                        {user.wins}
                                    </td>
                                    <td>
                                        {user.losses}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </DataContext.Provider>
    );
};

export default Dashboard;