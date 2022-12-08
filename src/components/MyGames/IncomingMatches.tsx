import { TbCheck, TbX } from "react-icons/tb";
import { auth } from "../../helpers/firebase";
import { MatchProps } from "../../interfaces/Match";
import Card from "../Cards/Card";

const IncomingMatches = (props: MatchProps) => {
  const child = (
    <div>
      { props.matches.map(match => {
        const contestant = match.players.filter(p => p.id != auth.currentUser?.uid)[0].name;
        return (
          <div key={match.timestamp.seconds.toString() + match.players[0].id + match.players[1].id} className="incoming__match__contestant">
            <span>{ contestant }</span>
            <div className="incoming__match__contestant__decision">
              <TbCheck></TbCheck>
              <TbX></TbX>
            </div>
          </div>
        );
      }) }
    </div>
  );

  return (
    <Card title="Match requests" child={child}/>
  )
};

export default IncomingMatches;