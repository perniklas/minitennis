import { auth } from "../../helpers/firebase";
import { Match } from "../../interfaces/Match"
import Card from "../Cards/Card";
import LatestMatches from "../LatestMatches/LatestMatches";

interface MatchProps {
  matches: Array<Match>;
}

const MyMatches = (props: MatchProps) => {
  return <Card title="My matches" child={<LatestMatches matches={props.matches} />}/>
}



export default MyMatches;