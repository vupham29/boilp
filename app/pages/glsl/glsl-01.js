export default class{
    constructor({el}){
        this.el = el;
    }

    create(){
        super.create();

        // create instance
        const instanceName = this.id;

        import(`./${instanceName}.js`)
            .then((instance) => {
                console.log(instance);
                this.lesson = new instance.default({
                    el: this.element,
                    canvas: this.element.querySelector('#canvas')
                });
            });
    }
}