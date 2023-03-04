import Page from '../../classes/Page';
import Aside from "../../components/Aside";

export default class extends Page{
    constructor(){
        super({
            element: '.lesson',
        });
    }

    create(){
        super.create();
        this.id = this.element.getAttribute('data-lesson');

        // not lessons page
        if(!this.id) return;

        // create instance
        const instanceName = this.id;
        import(`./${instanceName}.js`)
            .then((instance) => {
                this.lesson = new instance.default({
                    el: this.element,
                    canvas: this.element.querySelector('#canvas')
                });
            });

        this.asideElement = new Aside();
    }
}