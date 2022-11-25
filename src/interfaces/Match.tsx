import { User } from './User';

export interface Match {
    participants: Array<User>;
    winner?: User;
    timestamp?: Date;
};