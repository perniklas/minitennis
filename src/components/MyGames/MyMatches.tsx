import { MatchProps } from "../../interfaces/Match";
import Card from "../Cards/Card";
import LatestMatches from "../LatestMatches/LatestMatches";

const MyMatches = (props: MatchProps) => {
  const { matches } = props;
  console.log(matches);

  return <Card title="My matches" child={<LatestMatches matches={matches} />}/>
}

export default MyMatches;