import { auth } from "../../helpers/firebase";
import Card from "../Cards/Card";
import { User } from "../../interfaces/User";
import { useEffect, useState } from "react";
import { getOutgoingMatchesListener, updateAcceptedMatchInFirestore, updateDeclinedMatchInFirestore } from "../../helpers/firestore";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import PersonRow from "./PersonRow";

const OutgoingMatches = () => {
  const [matches, setMatches] = useState([]);
  const loggedIn = useAppSelector((state) => state.loggedIn);
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loggedIn) {
      const unsubscribe = getOutgoingMatchesListener(setMatches, users, dispatch);
      return () => unsubscribe();
    }
  }, [loggedIn]);

  const child = (
    <div>
      {matches.map(match => {
        const contestant = match.players.filter((p: User) => p.id != auth.currentUser?.uid)[0].name;
        return <PersonRow key={match.id} hideAccept={true} matchId={match.id} name={contestant} timestamp={match.timestamp}/>;
      })}
    </div>
  );

  if (!matches.length) {
    return (<></>);
  }

  return (
    <Card title="Sent requests" child={child} />
  )
};

export default OutgoingMatches;