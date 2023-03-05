import Component from "@/classes/Component";
import GSAP from "gsap";

export default class Preloader extends Component{
    constructor(){
        super({
            element: ".preloader",
            elements: {
                title: ".preloader__text",
                images: document.querySelectorAll("img")
            }
        });

        this.length = 0;

        this.splitText();
        this.createLoader();
    }

    createLoader(){
        // not images
        if(!this.elements.images.length){
            setTimeout(this.onLoaded.bind(this), 500);
            return;
        }

        this.elements.images.forEach(element => {
            element.onload = () => this.onAssetLoaded(element);
            element.src = element.getAttribute("data-src");
        });
    }

    onAssetLoaded(){
        this.length += 1;

        const percentage = this.length / this.elements.images.length;

        if(percentage === 1){
            this.onLoaded();
        }
    }

    splitText(){
        const textContent = this.elements.title.textContent;
        this.elements.title.innerHTML = textContent.split(" ").map(t => `<span><span>${t}</span></span>`).join(" ");
    }

    onLoaded(){
        return new Promise(resolve => {
            const tl = GSAP.timeline({
                defaults: {
                    ease: "power1.in"
                }
            });
            tl.to(this.elements.title.querySelectorAll("span span"), {
                yPercent: 100
            }).to(this.element, {
                y: "100%"
            });
        });
    }

    destroy(){
        this.element.parentNode.removeChild(this.element);
    }

}
