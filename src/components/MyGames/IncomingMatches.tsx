import { TbCheck, TbX } from "react-icons/tb";
import { auth } from "../../helpers/firebase";
import { Match } from "../../interfaces/Match";
import Card from "../Cards/Card";
import { User } from "../../interfaces/User";

interface IncomingMatchesProps {
  matches: Array<Match>;
  users: Array<User>;
  acceptMatch: Function;
  declineMatch: Function;
}

const IncomingMatches = (props: IncomingMatchesProps) => {
  const { matches, acceptMatch, declineMatch } = props;

  let prevMatch = matches[0];

  const child = (
    <div>
      {matches.map(match => {
        const contestant = match.players.filter(p => p.id != auth.currentUser?.uid)[0].name;
        return (
          <div key={match.id} className="incoming__match__contestant">
            <span>{contestant}</span>
            <div className="incoming__match__contestant__decision">
              <a className="incoming__match_decline cancel" onClick={() => declineMatch(match.id)}>
                <TbX></TbX>
              </a>
              <a className="incoming__match_accept greenlight" onClick={() => acceptMatch(match.id)}>
                <TbCheck></TbCheck>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Card title="Match Requests" child={child} />
  )
};

export default IncomingMatches;