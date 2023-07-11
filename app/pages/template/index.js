import Page from '@/classes/Page';

export default class extends Page{
    constructor(){
        super({
            element: '[data-page]',
        });
    }

    create(){
        super.create();

        // dynamic import
        this.id = this.element.getAttribute('data-page');

        // not lessons page
        if(!this.id) return;

        // destroy last instance
        if(this.instance){
            this.instance.destroy();
        }

        // create instance
        const instanceName = this.id;

        import(`./${instanceName}.js`)
            .then((instance) => {
                this.instance = new instance.default({
                    element: this.element,
                });
            });
    }
}