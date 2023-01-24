import { useEffect, useState } from 'react';
import { User } from '../../interfaces/User';
import { Match } from '../../interfaces/Match';
import { Tournament } from '../../interfaces/Tournament';
import './Dashboard.css';
import Card from '../Cards/Card';
import Leaderboard from '../Leaderboard/Leaderboard';
import LatestMatches from '../LatestMatches/LatestMatches';
import { getAllFinishedMatchesListener } from '../../helpers/firestore';
import { store } from '../../Redux/store';
import { highlightActiveTabButton } from '../../helpers/utils';

interface DashboardProps {
    tournaments: Array<Tournament>;
}

const Dashboard = (props: DashboardProps) => {
    // var { users, tournaments } = props;
    const [matches, setMatches] = useState([]);
    const state = store.getState();
    const users = state.users ?? [];

    useEffect(() => {
        if (users) {
            const unsubscribe = getAllFinishedMatchesListener(setMatches);
            highlightActiveTabButton();
    
            return () => unsubscribe();
        }
    }, [users]);

    let leaderboardUsers = [...users];
    let latestMatches = [...matches];
    if (leaderboardUsers.length) {
        leaderboardUsers = leaderboardUsers.sort((a: User, b: User) => (a.rating ?? 0) > (b.rating ?? 0) ? -1 : 1).slice(0, 7);
    }
    latestMatches = latestMatches.filter((m: Match) => m.winner).sort((a: Match, b: Match) => a.timestamp! > b.timestamp! ? -1 : 1);

    return (
        <div id="dashboard">
            <Card title="Top Players" child={<Leaderboard users={leaderboardUsers} />} />
            <Card title="Latest Matches" child={(<LatestMatches matches={latestMatches} />)} />
        </div>
    );
};

export default Dashboard;