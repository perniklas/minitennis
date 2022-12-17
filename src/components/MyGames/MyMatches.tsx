import { useAppSelector } from "../../Redux/hooks";
import Card from "../Cards/Card";
import LatestMatches from "../LatestMatches/LatestMatches";

const MyMatches = () => {
  const matches = useAppSelector(state => state.myMatchHistory);
  return <Card title="My matches" child={<LatestMatches matches={matches} />}/>
}



export default MyMatches;