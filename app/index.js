import Home from './pages/Home/index';
import NotFound from './pages/NotFound/index';
import Preloader from './components/Preloader';
import WebGL from "./pages/webgl";
import "@viivue/easy-tab-accordion";

class App{
    constructor(){
        this.createContent();

        this.createPreloader();
        this.createPages();

        this.addEventListener();
    }


    // get content and template from different pages
    createContent(){
        this.content = document.querySelector('.content');
        this.template = this.content.getAttribute('data-template'); // this.content.dataset.template is the equivalent but not supported for Safari
    }

    createPages(){
        this.pages = {
            home: new Home(),
            webgl: new WebGL(),
            error: new NotFound()
        };

        // create a routing with AJAX and gives single page app behaviour
        this.page = this.pages[this.template];
    }

    createPreloader(){
        this.preloader = new Preloader();
    }

    /*
    Events
    */

    onPreloaded(){
        this.preloader.destroy();
        this.page.show();
    }

    async handlePageChange({url, push = true}){
        await this.page.hide();
        const request = await window.fetch(url);

        if(request.status === 200){
            const html = await request.text();
            const div = document.createElement('div');

            div.innerHTML = html;
            const divContent = div.querySelector('.content');
            this.template = divContent.getAttribute('data-template');

            this.content.setAttribute('data-template', this.template);
            this.content.innerHTML = divContent.innerHTML;

            if(push){
                window.history.pushState({}, '', url);
            }

            this.page = this.pages[this.template];
            this.page.create();
            this.page.show();

            this.addLinksListener();
        }else{
            console.log("Error!");
        }
    }

    onPopState(){
        this.handlePageChange({url: window.location.pathname, push: false});
    }


    /*
    Listeners
    */
    addEventListener(){
        // Handle links click
        this.addLinksListener();

        // handlePopstate
        window.addEventListener('popstate', this.onPopState.bind(this));
    }

    addLinksListener(){
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const {href} = link;
                this.handlePageChange({url: href});
            });
        });
    }
}

new App();