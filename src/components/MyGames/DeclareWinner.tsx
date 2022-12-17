import { formatDate, formatTime } from "../../helpers/utils";
import { useAppSelector } from "../../Redux/hooks";
import Card from "../Cards/Card";

const DeclareWinner = () => {
  const matches = useAppSelector(state => state.declareWinnerMatches);

  const child = (
    <div>
      {matches.map(match => {
        return (
          <div className="declarewinner__match" key={match.id}>
            <span className="declarewinner__match_when">{formatDate(match.timestamp ?? 0) + " - " + formatTime(match.timestamp ?? 0)}</span>
            <div className="declarewinner__match_contestants">
              <span className="declarewinner__match_person greenlight">{match.players[0].name}</span>
              <span className="declarewinner__match_person greenlight">{match.players[1].name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (!matches.length) {
    return (<></>);
  }

  return (
    <Card title="Declare a winner" child={child} />
  );
}

export default DeclareWinner;