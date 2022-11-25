import './LatestMatches.css';
import { truncateName } from '../../helpers/utils';
import { Match } from '../../interfaces/Match'

interface MatchProps {
    matches: Array<Match>;
}

const LatestMatches = (props: MatchProps) => {
    const { matches } = props;

    return (
        <div>
            { matches.map((match: Match) => {
                return (
                    <div>
                        {match.timestamp?.toString() ?? ""}
                    </div>
                );
            }) }
        </div>
    );
};

export default LatestMatches;