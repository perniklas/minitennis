import { auth } from "../../helpers/firebase";
import { formatToPercentageString } from "../../helpers/utils";
import { MatchProps } from "../../interfaces/Match";
import Card from "../Cards/Card";

const MyStats = (props: MatchProps) => {
  const wins = props.matches.map(match => match.winner === auth.currentUser.uid).length;
  const losses = props.matches.map(match => match.winner !== auth.currentUser.uid).length;
  const games = wins + losses;
  const winrate = (wins / (games === 0 ? 1 : games));

  return (
    <Card title="Stats" child={(
      <div>
        <span>Wins: {wins}</span>
        <span>Losses: {losses}</span>
        <span>Winrate: {formatToPercentageString(winrate)}</span>
      </div>
    )} />
  )

};

export default MyStats;