export default class Book{
    #id;
    constructor(id, img, title, author, desc){
        this.#id = id;
        this.img = img;
        this.title = title;
        this.author = author;
        this.desc = desc;
    }
    // #getID(){
    //     return Math.ceil(Math.random()*100);
    // }
    get id(){
        return this.#id;
    }
    set id(newID){
        console.error(`Unable set ID to: ${newID}`)
    }
}