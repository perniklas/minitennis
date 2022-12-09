import { User } from './User';
import { Match } from './Match';

export interface Tournament {
    players: Array<User>;
    brackets?: Array<Match>;
    matches?: Array<Match>;
    winner?: User;
    timestamp?: Date;
}

export interface TournamentProps {
    tournaments: Array<Tournament>;
}