import Page from '@/classes/Page';

export default class extends Page{
    constructor(){
        super({
            element: '[data-page]',
        });
    }

    create(){
        super.create();

        this.id = this.element?.getAttribute('data-page');

        // not lessons page
        if(!this.id) return;

        // create instance
        const instanceName = this.id;

        import(`./${instanceName}.js`)
            .then((instance) => {
                this.page = new instance.default({
                    el: this.element,
                });
            });
    }
}