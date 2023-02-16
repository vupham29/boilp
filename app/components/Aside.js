import Component from "../classes/Component";
import GSAP from "gsap";

export default class Aside extends Component{
    constructor(){
        super({
            element: ".lesson__aside .close",
        });
        this.isOpen = true;
        this.createEventListener();
    }

    toggleAside(){
        GSAP.defaults({
            duration: 0.8
        });
        if(this.isOpen){
            GSAP.to(this.element.closest('.lesson__aside'), {
                xPercent: -100,
            });
            this.isOpen = false;
        }else{
            GSAP.to(this.element.closest('.lesson__aside'), {
                xPercent: 0,
            });
            this.isOpen = true;
        }
    }

    createEventListener(){
        this.element.addEventListener("click", this.toggleAside.bind(this));
    }
}
