import { User } from './user';

export class Comment {
    constructor(
        public id: String,
        public author: User,
        public text: String
    ) {

    }
}