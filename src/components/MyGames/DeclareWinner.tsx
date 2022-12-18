import { formatDate, formatTime } from "../../helpers/utils";
import Card from "../Cards/Card";
import { useEffect, useState } from 'react';
import { getDeclareWinnerMatchesListener } from "../../helpers/firestore";
import { User } from "../../interfaces/User";
import { auth } from "../../helpers/firebase";

interface DeclareWinnerProps {
  loggedIn: boolean;
}

const DeclareWinner = (props: DeclareWinnerProps) => {
  const [matches, setMatches] = useState([]);
  const { loggedIn } = props;

  useEffect(() => {
    if (!loggedIn) return;

    const unsubscribe = getDeclareWinnerMatchesListener(setMatches);
    console.log(matches);
    return () => unsubscribe();
  }, [loggedIn]);

  const handleDeclaringWinnerForMatch = (winner: User) => {
    
  };

  const child = (
    <div>
      {matches.map(match => {
        const me = "Me";//match.players.find((p: User) => p.id === auth.currentUser.uid).name;
        const them = match.players.find((p: User) => p.id !== auth.currentUser.uid).name;

        return (
          <div className="declarewinner__match" key={match.id}>
            <span className="declarewinner__match_when">{formatDate(match.timestamp ?? 0) + " - " + formatTime(match.timestamp ?? 0)}</span>
            <div className="declarewinner__match_contestants">
              <span className="declarewinner__match_person greenlight" onClick={() => handleDeclaringWinnerForMatch(match.players.find((p: User) => p.id !== auth.currentUser.uid))}>{them}</span>
              <span className="declarewinner__match_person greenlight" onClick={() => handleDeclaringWinnerForMatch(match.players.find((p: User) => p.id === auth.currentUser.uid))}>{me}</span>
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