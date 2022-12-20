import { useEffect, useState } from 'react';
import { User } from '../../interfaces/User';
import { Match } from '../../interfaces/Match';
import { Tournament } from '../../interfaces/Tournament';
import './Dashboard.css';
import Card from '../Cards/Card';
import Leaderboard from '../Leaderboard/Leaderboard';
import LatestMatches from '../LatestMatches/LatestMatches';
import { getAllFinishedMatchesListener } from '../../helpers/firestore';

interface DashboardProps {
    users: Array<User>;
    tournaments: Array<Tournament>;
}

const Dashboard = (props: DashboardProps) => {
    var { users, tournaments } = props; //[matches, setMatches] = useState<Array<Match>>([]);

    const [matches, setMatches] = useState([]);
    
    useEffect(() => {
        
        const unsubscribe = getAllFinishedMatchesListener(setMatches, 10);

        return () => unsubscribe();
    });

    const leaderboardUsers = users.sort((a: User, b: User) => (a.rating ?? 0) > (b.rating ?? 0) ? -1 : 1).slice(0, 7);
    const latestMatches = matches.filter((m: Match) => m.winner).sort((a: Match, b: Match) => a.timestamp! > b.timestamp! ? -1 : 1);

    return (
        <div id="dashboard">
            <Card title="Top Players" child={<Leaderboard users={leaderboardUsers} />}/>
            <Card title="Latest Matches" child={(<LatestMatches matches={matches}/>)}/>
        </div>
    );
};

export default Dashboard;