import './LatestMatches.css';
import { formatDate, formatTime, truncateName } from '../../helpers/utils';
import { Match } from '../../interfaces/Match'

interface MatchProps {
    matches: Array<Match>;
}

const LatestMatches = (props: MatchProps) => {
    const { matches } = props;
    matches.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
    const latestMatches = matches.slice(0, 10);

    return (
        <div className="latestMatches">
            {latestMatches.map((match: Match) => {
                var key = match.timestamp?.toString() ?? "match";
                key += ("-" + match.players.map(p => p?.id).join('-'));

                const firstColor = (match.players[0]?.id === match.winner) ? "winner" : "loser";
                const secondColor = (match.players[1]?.id === match.winner) ? "winner" : "loser";

                return (
                    <div key={key} className="dashboard__match">
                        <div className="dashboard__match__dt">
                            <span>{formatDate((match.timestamp ?? 0))}</span>
                            <span style={{ float: "right" }}>{formatTime((match.timestamp ?? 0))}</span>
                        </div>
                        <div className="dashboard__match__vs">
                            <span className={firstColor} title={match.players[0]?.name}>{truncateName(match.players[0]?.name ?? "")}</span>
                            <span>vs</span>
                            <span className={secondColor} title={match.players[1]?.name}>{truncateName(match.players[1]?.name ?? "")}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LatestMatches;