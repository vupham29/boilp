import Component from "@/classes/Component";
import GSAP from "gsap";

export default class Aside extends Component{
    constructor(){
        super({
            element: ".lesson__aside .close",
        });
        this.isOpen = true;
        this.createEventListener();

        this.aside = this.element.closest('.lesson__aside');

        // create GSAP
        this.timeline = this.createTimeline({
            defaults: {durations: 0.8},
            paused: true,
            onReverseComplete: () => {
                this.aside.classList.remove('hide');
            }
        });

        // timeline start animation
        this.timeline.to(this.aside, {
            width: 0,
            paddingLeft: 0,
            paddingRight: 0,
            onStart: () => {
                this.aside.classList.add('hide');
            }
        });

        Array.from(this.element.closest('.lesson__aside').children).forEach(node => {
            node.style.width = node.getBoundingClientRect().width + 'px';
        });
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
        this.element.addEventListener("click", this.toggleAside.bind(this));
    }

    removeEventListener(){
        this.element.removeEventListener("click", this.toggleAside.bind(this));
    }
}
