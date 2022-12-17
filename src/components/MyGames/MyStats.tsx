import { auth } from "../../helpers/firebase";
import { formatToPercentageString } from "../../helpers/utils";
import { MatchProps } from "../../interfaces/Match";
import { useAppSelector } from "../../Redux/hooks";
import Card from "../Cards/Card";

const MyStats = () => {
  const matchHistory = useAppSelector(state => state.myMatchHistory);

  const wins = matchHistory.filter(match => match.winner === auth.currentUser?.uid).length;
  const losses = matchHistory.filter(match => match.winner !== auth.currentUser?.uid).length;
  const games = wins + losses;
  const winrate = (wins / (games === 0 ? 1 : games));

  return (
    <Card title="My Stats" child={(
      <div id="mystats">
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