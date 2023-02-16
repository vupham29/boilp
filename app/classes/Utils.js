export default class Utils{
    constructor({element, elements}){
        this.selector = element;
        this.selectorChildren = {
            ...elements
        };

        // create DOM elements
        this.create();
    }

    create(){
        if(this.selector instanceof window.HTMLElement){
            this.element = this.selector;
        }else{
            this.element = document.querySelector(this.selector);
        }
        this.elements = {};

        for(const [key, entry] of Object.entries(this.selectorChildren)){
            if(entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)){
                this.elements[key] = entry;
            }else{
                this.elements[key] = this.element.querySelectorAll(entry);

                if(this.elements[key].length === 0){
                    this.elements[key] = null;
                }else if(this.elements[key].length === 1){
                    this.elements[key] = this.element.querySelector(entry);
                }
            }
        }
    }
}