import { TbCheck, TbX } from "react-icons/tb";
import { auth } from "../../helpers/firebase";
import Card from "../Cards/Card";
import { User } from "../../interfaces/User";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setDeclareWinnerMatches, setIncomingMatches } from "../../Redux/reducers";

interface IncomingMatchesProps {
  users: Array<User>;
  loggedIn: boolean;
}

const IncomingMatches = (props: IncomingMatchesProps) => {
  const dispatch = useAppDispatch();
  const matches = useAppSelector(state => state.incomingMatches);
  const declareWinnerMatches = useAppSelector(state => state.declareWinnerMatches);

  const removeMatchFromIncoming = (id: string) => {
    const match = matches.find(m => m.id === id);
    const newMatches = matches.filter(m => m.id !== id);
    dispatch(setIncomingMatches(newMatches));
    return match;
  };


  const acceptMatch = (id: string) => {
    const match = removeMatchFromIncoming(id);
    const newMatches = [...declareWinnerMatches];
    newMatches.push(match);
    dispatch(setDeclareWinnerMatches(newMatches));;
  };

  const declineMatch = (id: string) => {

  };

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

  if (!matches.length) {
    return (<></>);
  }

  return (
    <Card title="Match Requests" child={child} />
  )
};

export default IncomingMatches;