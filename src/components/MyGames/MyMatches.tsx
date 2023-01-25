import { MatchProps } from "../../interfaces/Match";
import Card from "../Cards/Card";
import LatestMatches from "../LatestMatches/LatestMatches";

const MyMatches = (props: MatchProps) => {
  const { matches } = props;

  return <Card title="Match history" child={<LatestMatches matches={matches} />}/>
}

export default MyMatches;