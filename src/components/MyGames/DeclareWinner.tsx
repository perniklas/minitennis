import { formatDate, formatTime } from "../../helpers/utils";
import Card from "../Cards/Card";
import { useEffect, useState } from 'react';
import { getDeclareWinnerMatchesListener, updateWinnerOfMatchInFirestore, users } from "../../helpers/firestore";
import { User } from "../../interfaces/User";
import { auth } from "../../helpers/firebase";
import { Match } from "../../interfaces/Match";
import { useAppDispatch } from "../../Redux/hooks";
import { setAllUsers } from "../../Redux/actions";

interface DeclareWinnerProps {
  loggedIn: boolean;
  setUsers: Function;
}

const DeclareWinner = (props: DeclareWinnerProps) => {
  const [matches, setMatches] = useState([]);
  const { loggedIn } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedIn) return;

    const unsubscribe = getDeclareWinnerMatchesListener(setMatches);
    return () => unsubscribe();
  }, [loggedIn]);

  const createUserObjectWithAdditionalWinOrLoss = (user: User, winner: boolean) => {
    let newUser: User = {
      name: user.name,
      id: user.id,
      docId: user.docId,
      wins: (winner ? user.wins + 1 : user.wins),
      losses: (winner ? user.losses : user.losses + 1),
      rating: user.rating,
    };

    return newUser;
  };

  let loading = false;
  const handleDeclaringWinnerForMatch = async (match: Match, winnerId: string, loserId: string) => {
    if (loading) return;
    loading = true;
    let winner = users.find(u => u.id === winnerId);
    let loser = users.find(u => u.id === loserId);

    const newRatings = await updateWinnerOfMatchInFirestore(match, winner, loser);
    let updatedUsers = users.filter((u: User) => u.id !== winnerId && u.id !== loserId);
    winner = createUserObjectWithAdditionalWinOrLoss(winner, true);
    winner.rating = newRatings[0];
    loser = createUserObjectWithAdditionalWinOrLoss(loser, false);
    loser.rating = newRatings[1];
    updatedUsers = [...updatedUsers, winner, loser];
    dispatch(setAllUsers(updatedUsers));
    props.setUsers(updatedUsers);
    loading = false;
  };

  const child = (
    <div>
      {matches.map((match: Match) => {
        const me = "Me";//match.players.find((p: User) => p.id === auth.currentUser.uid).name;
        const them = match.players.find((p: User) => p.id !== auth.currentUser.uid);

        return (
          <div className="declarewinner__match" key={match.id}>
            <span className="declarewinner__match_when">{formatDate(match.timestamp ?? 0) + " - " + formatTime(match.timestamp ?? 0)}</span>
            <div className="declarewinner__match_contestants">
              <span className="declarewinner__match_person greenlight" onClick={() => handleDeclaringWinnerForMatch(match, them.id, auth.currentUser.uid)}>
                {them.name}
              </span>
              <span className="declarewinner__match_person greenlight" onClick={() => handleDeclaringWinnerForMatch(match, auth.currentUser.uid, them.id)}>
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