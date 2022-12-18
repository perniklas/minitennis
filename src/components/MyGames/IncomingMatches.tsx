import { TbCheck, TbX } from "react-icons/tb";
import { auth } from "../../helpers/firebase";
import Card from "../Cards/Card";
import { User } from "../../interfaces/User";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setDeclareWinnerMatches, setIncomingMatches } from "../../Redux/reducers";
import { useEffect, useState } from "react";
import { getIncomingMatchesListener, updateAcceptedMatchInFirestore } from "../../helpers/firestore";

interface IncomingMatchesProps {
  users: Array<User>;
  loggedIn: boolean;
}

const IncomingMatches = (props: IncomingMatchesProps) => {
  const { loggedIn } = props;
  let loading = false;

  const [matches, setMatches] = useState([]);
  useEffect(() => {
    if (!loggedIn) return;

    const unsubscribe = getIncomingMatchesListener(setMatches);
    return () => unsubscribe();
  }, [loggedIn]);

  const acceptMatch = async (id: string) => {
    if (loading) return;
    loading = true;
    
    await updateAcceptedMatchInFirestore(id);
    loading = false;
  };

  const declineMatch = (id: string) => {

  };

  const child = (
    <div>
      {matches.map(match => {
        const contestant = match.players.filter((p: User) => p.id != auth.currentUser?.uid)[0].name;
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

  if (!matches.length) {
    return (<></>);
  }

  return (
    <Card title="Match Requests" child={child} />
  )
};

export default IncomingMatches;