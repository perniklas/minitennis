import { formatDate, formatTime } from "../../helpers/utils";
import Card from "../Cards/Card";
import { useEffect, useState } from 'react';
import { getDeclareWinnerMatchesListener, updateWinnerOfMatchInFirestore } from "../../helpers/firestore";
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
    let response = window.confirm('Are you sure??');

    if (!response) return;

    loading = true;
    let winnerUser = users.find(u => u.id === winnerId);
    let loserUser = users.find(u => u.id === loserId);
    let winner: User = {
      ...winnerUser
    };
    let loser: User = {
      ...loserUser
    };

    const newRatings = await updateWinnerOfMatchInFirestore(match, winner, loser);
    updateUserStats(newRatings, winner, loser);

    loading = false;
  };

  const updateUserStats = (newRatings: number[], winner: User, loser: User) => {
    winner = createUserObjectWithAdditionalWinOrLoss(winner, true);
    loser = createUserObjectWithAdditionalWinOrLoss(loser, false);

    winner.rating = newRatings[0];
    loser.rating = newRatings[1];

    let updatedUsers = [...users.filter((u: User) => u.id !== winner.id && u.id !== loser.id), winner, loser];
    dispatch(setAllUsers(updatedUsers));
  }

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