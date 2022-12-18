import { formatDate, formatTime } from "../../helpers/utils";
import Card from "../Cards/Card";
import { useEffect, useState } from 'react';
import { auth, db } from '../../helpers/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Match } from "../../interfaces/Match";

interface DeclareWinnerProps {
  loggedIn: boolean;
}

const DeclareWinner = (props: DeclareWinnerProps) => {
  const [matches, setMatches] = useState([]);
  const { loggedIn } = props;

  useEffect(() => {
    if (!loggedIn) return;

    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid),
      where("winner", "==", null), where("accepted", "==", true), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(matchQuery, docsSnap => {
      const matchList: Match[] = [];
      docsSnap.forEach(doc => {
        const matchData = doc.data() as Match;
        matchList.push(matchData);
      });

      setMatches(matchList);
    });

    return () => unsubscribe();
  }, []);

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