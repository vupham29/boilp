import Component from "@/classes/Component";
import GSAP from "gsap";

export default class Aside extends Component{
    constructor(){
        super({
            element: "[data-page] [data-aside]",
            elements: {
                close: '[data-aside] [data-close]'
            }
        });

        this.isOpen = true;
        this.createEventListener();

        // create GSAP
        this.timeline = this.createTimeline({
            defaults: {durations: 0.5},
            ease: 'Power1.easeIn',
            paused: true,
            onReverseComplete: () => {
                this.element.classList.remove('hide');
            }
        });

        // timeline start animation
        this.timeline.to(this.element, {
            width: 0,
            paddingLeft: 0,
            paddingRight: 0,
            onStart: () => {
                this.element.classList.add('hide');
            }
        });

        Array.from(this.element.children).forEach(node => {
            node.style.width = node.getBoundingClientRect().width + 'px';
        });

        // toggle aside
        this.toggleAside();
    }

    createTimeline(options){
        return GSAP.timeline({
            ...options
        });
    }

    toggleAside(){
        if(this.isOpen){
            this.timeline.play();
            this.isOpen = false;
        }else{
            this.timeline.reverse();
            this.isOpen = true;
        }
    }

    createEventListener(){
        this.elements.close.addEventListener("click", this.toggleAside.bind(this));
    }

    removeEventListener(){
        this.elements.close.removeEventListener("click", this.toggleAside.bind(this));
    }
}
