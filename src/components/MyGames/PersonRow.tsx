import { TbCheck, TbX } from "react-icons/tb";
import { updateAcceptedMatchInFirestore, updateDeclinedMatchInFirestore } from "../../helpers/firestore";
import { formatDate } from "../../helpers/utils";

interface PersonRowProps {
  name: string;
  timestamp: number;
  matchId: string;
  hideAccept: boolean;
};

const PersonRow = (props: PersonRowProps) => {
  const { matchId, name, timestamp, hideAccept } = props;
  const date = formatDate(timestamp);
  let loading = false;

  const acceptMatch = async (id: string) => {
    if (loading) return;
    loading = true;
    
    await updateAcceptedMatchInFirestore(id);
    loading = false;
  };

  const cancelMatch = async (id: string, contestant: string) => {
    if (loading) return;
    if (!window.confirm('Cancel match request against ' + contestant + '?')) return;
    loading = true;
    
    await updateDeclinedMatchInFirestore(id);
    loading = false;
  };

  return (
    <div className="incoming__match__contestant">
      <div style={{marginBottom: '10px'}}>
        <span>{date}</span>
      </div>
      <div className="row">
        <span style={{color: '#f8cb96'}}>{name}</span>
        <div className="incoming__match__contestant__decision">
          <a className="incoming__match_decline cancel" onClick={() => cancelMatch(matchId, name)}>
            <TbX></TbX>
          </a>
          {hideAccept ? <></> : <a className="incoming__match_accept greenlight" onClick={() => acceptMatch(matchId)}>
            <TbCheck></TbCheck>
          </a>}
        </div>
      </div>
    </div>
  );
};

export default PersonRow;