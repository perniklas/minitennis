import { formatDate, formatTime } from "../../helpers/utils";
import { MatchProps } from "../../interfaces/Match";
import Card from "../Cards/Card";

const DeclareWinner = (props: MatchProps) => {
  console.log("declare winner: ", props);
  const child = (
    <div>
      { props.matches.map(match => {
        return (
          <div className="declarewinner__match" key={match.id}>
            <span>{formatDate(match.timestamp.seconds ?? 0) + " - " + formatTime(match.timestamp.seconds ?? 0)}</span>
            <span className="declarewinner__match_contestant">{ match.players[0].name }</span>
            <span className="declarewinner__match_contestant">{ match.players[1].name }</span>
          </div>
        );
      }) }
    </div>
  );

  return (
    <Card title="Declare a winner" child={child}/>
  );
}

export default DeclareWinner;