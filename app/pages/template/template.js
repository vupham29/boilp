export default class{
    constructor({el}){
        this.el = el;
    }

    // for destroy this script when navigating between each page
    destroy(){
        console.log('destroyed', this);
    }
}