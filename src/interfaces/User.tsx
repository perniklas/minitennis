export interface User {
    id: string,
    name: string,
    wins?: number,
    losses?: number,
    rating?: number
};

export interface UserProps {
    users: Array<User>;
}