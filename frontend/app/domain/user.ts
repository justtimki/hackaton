import { Image } from './image';

export class User {
    constructor(
        public firstName: String,
        public lastName: String,
        public skype: String,
        public phone: String,
        public avatar: Image 
        ) {

    }
}