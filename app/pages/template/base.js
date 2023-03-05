import Page from '@/classes/Page';
import Aside from "@/components/Aside";

export default class extends Page{
    constructor(){
        super({
            element: '.lesson',
        });
    }

    create(){
        super.create();
        this.id = this.element?.getAttribute('data-lesson');

        // not lessons page
        if(!this.id) return;

        this.asideElement = new Aside();
    }
}