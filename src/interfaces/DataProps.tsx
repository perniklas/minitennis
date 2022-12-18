import { Match } from "./Match";
import { Tournament } from "./Tournament";
import { User } from "./User";

export default interface DataProps {
  users: Array<User>;
  tournaments: Array<Tournament>;
}