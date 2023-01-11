import { auth } from "../../helpers/firebase";
import { formatToPercentageString } from "../../helpers/utils";
import { MatchProps } from "../../interfaces/Match";
import { store } from "../../Redux/store";
import Card from "../Cards/Card";
import StatCharts from "./StatCharts";

const MyStats = (props: MatchProps) => {
  //const matchHistory = useAppSelector(state => state.myMatchHistory);
  const { matches } = props;

  const state = store.getState();
  const me = state.users.find(u => u.id === auth.currentUser?.uid);
  if (!me) {
    return (<div></div>);
  }

  const wins = matches.filter(match => match.winner === auth.currentUser?.uid).length;
  const losses = matches.filter(match => match.winner !== auth.currentUser?.uid).length;
  const games = wins + losses;
  const winrate = (wins / (games === 0 ? 1 : games));

  return (
    <Card title="My Stats" child={(
      <div id="mystats">
        <div className="mystats__row">
          <span>Rating:</span><span style={{ float: "right" }}>{me.rating.toFixed(2) ?? 1000}</span>
        </div>
        <div className="mystats__row">
          <span>Wins:</span><span className="greenlight" style={{ float: "right" }}>{wins}</span>
        </div>
        <div className="mystats__row">
          <span>Losses:</span><span className="cancel" style={{ float: "right" }}>{losses}</span>
        </div>
        <div className="mystats__row">
          <span>Winrate:</span><span style={{ float: "right" }}>{formatToPercentageString(winrate)}</span>
        </div>
      </div>
    )} />
  )

};

export default MyStats;