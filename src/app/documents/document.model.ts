export class Document {
    constructor (
        public id: string,
        public name: string,
        public url: string,
        public children?: Document []
    ){

    }
}

// public description: string,