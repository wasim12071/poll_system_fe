import { Nominee } from './Nominee';

export class Vote {
    _id: string;
    email: string;
    nomineeId: string;
    nominee: Nominee;
}
