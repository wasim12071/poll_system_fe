import { Vote } from './vote';

export class Nominee {
    _id: string;
    firstName: string;
    lastName: string;
    votes: Array<Vote>;
    count: number;
}
