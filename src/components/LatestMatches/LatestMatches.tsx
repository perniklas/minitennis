import './LatestMatches.css';
import { formatDate, formatTime, truncateName } from '../../helpers/utils';
import { Match } from '../../interfaces/Match'

interface MatchProps {
    matches: Array<Match>;
}

const LatestMatches = (props: MatchProps) => {
    const { matches } = props;

    return (
        <div>
            { matches.map((match: Match) => {
                var key = match.timestamp?.toString() ?? "match";
                key += ("-" + match.players.map(p => p.id).join('-'));

                const firstColor = (match.players[0].id === match.winner) ? "winner" : "loser";
                const secondColor = (match.players[1].id === match.winner) ? "winner" : "loser";

                return (
                    <div key={key} className="dashboard__match">
                        <div className="dashboard__match__dt">
                            <span>{formatDate((match.timestamp?.seconds ?? 0))}</span>
                            <span style={{float: "right"}}>{formatTime((match.timestamp?.seconds ?? 0))}</span>
                        </div>
                        <div className="dashboard__match__vs">
                            <span className={firstColor}>{truncateName(match.players[0].name ?? "")}</span>
                            <span>vs</span>
                            <span className={secondColor}>{truncateName(match.players[1].name ?? "")}</span>
                        </div>
                    </div>
                );
            }) }
        </div>
    );
};

export default LatestMatches;