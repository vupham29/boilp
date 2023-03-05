import Page from "@/classes/Page";

export default class extends Page{
    constructor(){
        super({
            id: 'error',
            element: '.error',
        });
    }

    create(){
        super.create();
    }
}