import { getDashboardOverview } from '../../helpers/firestore';
import { useEffect, useState } from 'react';
import { User } from '../../interfaces/User';
import { Match } from '../../interfaces/Match';
import { Tournament } from '../../interfaces/Tournament';
import './Dashboard.css';
import Loading from '../Loading/Loading';
import DataContext from '../../Context/Data.context';
import Card from '../Cards/Card';
import Leaderboard from '../Leaderboard/Leaderboard';
import LatestMatches from '../LatestMatches/LatestMatches';

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

    if (loading) {
        return <Loading message="Loading users..."></Loading>;
    }

    const leaderboardUsers = users.sort((a: User, b: User) => (a.rating ?? 0) > (b.rating ?? 0) ? -1 : 1).slice(0, 7);
    const latestMatches = matches.filter((m: Match) => m.timestamp).sort((a: Match, b: Match) => a.timestamp! > b.timestamp! ? -1 : 1);

    return (
        <DataContext.Provider value={data}>
            <div id="dashboard">
                <Card title="Top Players" child={<Leaderboard users={leaderboardUsers} />}/>
                <Card title="Latest Matches" child={(<LatestMatches matches={latestMatches}/>)}/>
            </div>
        </DataContext.Provider>
    );
};

export default Dashboard;