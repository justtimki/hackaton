export class Image {
    constructor(
        public id: String,
        public altText: String,
        public extension: String,
        public uri: string, //use just string or URI obj ???
        public description:String 
    ) {

    }
}