import internal from 'stream';
import { User } from './User';

export interface Match {
    players: Array<User>;
    winner?: string;
    timestamp?: {
        seconds: number;
        nanoseconds: number;
    };
    accepted?: boolean;
};

export interface MatchProps {
    matches: Array<Match>;
}