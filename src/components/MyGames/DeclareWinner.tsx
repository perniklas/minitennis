import { formatDate, formatTime } from "../../helpers/utils";
import Card from "../Cards/Card";
import { useEffect, useState } from 'react';
import { getDeclareWinnerMatchesListener, updateWinnerOfMatchInFirestore, users } from "../../helpers/firestore";
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

  let loading = false;
  const handleDeclaringWinnerForMatch = async (matchId: string, winnerId: string, loserId: string) => {
    if (loading) return;
    loading = true;
    let winner = users.find(u => u.id === winnerId);
    let loser = users.find(u => u.id === loserId);

    await updateWinnerOfMatchInFirestore(matchId, winner, loser);
    loading = false;
  };

  const child = (
    <div>
      {matches.map(match => {
        const me = "Me";//match.players.find((p: User) => p.id === auth.currentUser.uid).name;
        const them = match.players.find((p: User) => p.id !== auth.currentUser.uid);

        return (
          <div className="declarewinner__match" key={match.id}>
            <span className="declarewinner__match_when">{formatDate(match.timestamp ?? 0) + " - " + formatTime(match.timestamp ?? 0)}</span>
            <div className="declarewinner__match_contestants">
              <span className="declarewinner__match_person greenlight" onClick={() => handleDeclaringWinnerForMatch(match.id, them.id, auth.currentUser.uid)}>
                {them.name}
              </span>
              <span className="declarewinner__match_person greenlight" onClick={() => handleDeclaringWinnerForMatch(match.id, auth.currentUser.uid, them.id)}>
                {me}
              </span>
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