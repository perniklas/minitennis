import { useEffect, useState } from 'react';
import { User } from '../../interfaces/User';
import { Match } from '../../interfaces/Match';
import { Tournament } from '../../interfaces/Tournament';
import './Dashboard.css';
import Card from '../Cards/Card';
import Leaderboard from '../Leaderboard/Leaderboard';
import LatestMatches from '../LatestMatches/LatestMatches';
import { highlightActiveTabButton } from '../../helpers/utils';
import { useAppSelector } from '../../Redux/hooks';

interface DashboardProps {
    tournaments: Array<Tournament>;
}

const Dashboard = (props: DashboardProps) => {
    const matches = useAppSelector(state => state.matchHistory);

    useEffect(() => {
        highlightActiveTabButton();
    }, []);

    return (
        <div id="dashboard">
            <Card title="Top Players" child={<Leaderboard />} />
            <Card title="Latest Matches" child={(<LatestMatches matches={matches}/>)} />
        </div>
    );
};

export default Dashboard;