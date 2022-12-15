import internal from 'stream';
import { User } from './User';

export interface Match {
    id: string,
    players: Array<User>;
    winner?: string;
    challenger: string;
    timestamp?: number;
    accepted?: boolean;
};

export interface MatchProps {
    matches: Array<Match>;
}