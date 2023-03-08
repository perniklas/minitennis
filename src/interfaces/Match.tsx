import { User } from './User';

export interface Match {
    id: string,
    players: Array<User>;
    winner?: string;
    challenger: string;
    timestamp?: number;
    accepted?: boolean;
    score?: {
        winner: number;
        loser: number;
    }
};

export interface MatchProps {
    matches: Match[];
}

export interface MatchStats {
    id: string,
    rating: number,
    timestamp: number,
    win: boolean,
    date?: Date
}