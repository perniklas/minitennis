import './LatestMatches.css';
import { formatDate, formatTime, truncateName } from '../../helpers/utils';
import { Match } from '../../interfaces/Match'

interface MatchHistory {
    matches: Match[]
}

const LatestMatches = (props: MatchHistory) => {
    const matches = [...props.matches];
    if (!matches.length) {
        return (<></>);
    }
    
    matches.sort((a: Match, b: Match) => a.timestamp > b.timestamp ? -1 : 1);

    return (
        <div className="scrollbar_inside_box">
            <div className="latestMatches">
                {matches.map((match: Match, index: number) => {
                    const firstColor = (match.players[0]?.id === match.winner) ? "winner" : "loser";
                    const secondColor = (match.players[1]?.id === match.winner) ? "winner" : "loser";
                    const winnerScore = match.score?.winner;
                    const loserScore = match.score?.loser;

                    return (
                        <div key={index} className="dashboard__match">
                            <div className="dashboard__match__dt">
                                <span>{formatDate((match.timestamp ?? 0))}</span>
                                <span style={{ float: "right" }}>{formatTime((match.timestamp ?? 0))}</span>
                            </div>
                            <div className="dashboard__match__vs">
                                <span className={firstColor} title={match.players[0]?.name}>{truncateName(match.players[0]?.name ?? "")}</span>
                                <span>vs</span>
                                <span className={secondColor} title={match.players[1]?.name}>{truncateName(match.players[1]?.name ?? "")}</span>
                            </div>
                            { match.score ? 
                            <div className="dashboard__match__vs">
                                <span className={firstColor} title="Score">{firstColor === 'winner' ? winnerScore : loserScore}</span>
                                <span></span>
                                <span className={secondColor} title="Score">{secondColor === 'winner' ? winnerScore : loserScore}</span>
                            </div>
                             : <></>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LatestMatches;