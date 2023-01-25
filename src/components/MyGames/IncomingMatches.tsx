import { TbCheck, TbX } from "react-icons/tb";
import { auth } from "../../helpers/firebase";
import Card from "../Cards/Card";
import { User } from "../../interfaces/User";
import { useEffect, useState } from "react";
import { getIncomingMatchesListener, updateAcceptedMatchInFirestore, updateDeclinedMatchInFirestore } from "../../helpers/firestore";
import { useAppSelector } from "../../Redux/hooks";
import PersonRow from "./PersonRow";


const IncomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const loggedIn = useAppSelector((state) => state.loggedIn);
  let loading = false;

  useEffect(() => {
    if (loggedIn) {
      const unsubscribe = getIncomingMatchesListener(setMatches);
      return () => unsubscribe();
    }
  }, [loggedIn]);

  const child = (
    <div>
      {matches.map(match => {
        const contestant = match.players.filter((p: User) => p.id != auth.currentUser?.uid)[0].name;
        return <PersonRow name={contestant} matchId={match.id} timestamp={match.timestamp} hideAccept={false} />;
      })}
    </div>
  );

  if (!matches.length) {
    return (<></>);
  }

  return (
    <Card title="Incoming requests" child={child} />
  )
};

export default IncomingMatches;