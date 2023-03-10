import { formatDate, formatTime, updateUserStats } from "../../helpers/utils";
import Card from "../Cards/Card";
import { useEffect, useState } from 'react';
import { getDeclareWinnerMatchesListener, MatchResults, updateWinnerOfMatchInFirestore } from "../../helpers/firestore";
import { User } from "../../interfaces/User";
import { auth } from "../../helpers/firebase";
import { Match } from "../../interfaces/Match";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setAllUsers } from "../../Redux/actions";
import { RootState } from "../../Redux/store";

const DeclareWinner = () => {
  // const [matches, setMatches] = useState([]);
  const matches = useAppSelector(state => state.declareWinnerMatches);
  const loggedIn = useAppSelector((state) => state.loggedIn);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    if (!loggedIn) return;

    // const unsubscribe = getDeclareWinnerMatchesListener(setMatches, users);
    // return () => unsubscribe();
  }, [loggedIn]);

  const refreshUsers = (winner: User, loser: User) => {
    let updatedUsers = [...users.filter((u: User) => u.id !== winner.id && u.id !== loser.id), winner, loser];
    dispatch(setAllUsers(updatedUsers));
  };

  let loading = false;
  const handleDeclaringWinnerForMatch = async (match: Match, winnerId: string, loserId: string, score1?: number, score2?: number) => {
    if (loading) return;
    const response = window.confirm('Are you sure?? You can\'t regret this decision');

    if (!response) return;

    loading = true;
    const winnerUser = users.find(u => u.id === winnerId);
    const loserUser = users.find(u => u.id === loserId);
    const winner: User = {
      ...winnerUser
    };
    const loser: User = {
      ...loserUser
    };

    const results: MatchResults = {
      winner,
      loser
    };

    const newRatings = await updateWinnerOfMatchInFirestore(match.id, results);
    updateUserStats(newRatings, winner, loser, refreshUsers);

    loading = false;
  };

  const child = (
    <div>
      {matches.map((match: Match) => {
        const me = match.players.find((p: User) => p.id === auth.currentUser.uid).name;
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