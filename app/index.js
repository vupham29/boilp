import Preloader from './components/Preloader';
import './components/theme.min';

class App{
    constructor(){
        this.createContent();

        this.createPreloader();
        this.createPage();

        this.afterPageLoaded();
    }

    afterPageLoaded(){
        this.addEventListener();
    }

    // get content and template from different pages
    createContent(){
        this.content = document.querySelector('[data-template]');
        this.template = this.content.getAttribute('data-template'); // this.content.dataset.template is the equivalent but not supported for Safari
    }

    createPage(){
        this.pages = {};

        this.dynamicImportPage().then(() => {
            this.page = this.pages[this.template];
        });
    }

    dynamicImportPage(){
        return new Promise((resolve) => {
            // smart import
            if(!this.pages[this.template]){
                import(`@/pages/${this.template}`)
                    .then((instance) => {
                        this.pages[this.template] = new instance.default();
                        resolve();
                    });
            }else{
                resolve();
            }
        });
    }

    createPreloader(){
        if(document.body.hasAttribute('data-preloader')){
            this.preloader = new Preloader();
        }
    }

    /**
     * Events
     * */

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
            const divContent = div.querySelector('[data-template]');
            this.template = divContent.getAttribute('data-template');

            // change title html
            document.querySelector('head > title').innerHTML = div.querySelector('title').innerHTML;

            // change content HTML
            this.content.outerHTML = divContent.outerHTML;
            this.content = document.querySelector('[data-template]');

            // push to popstate
            if(push){
                window.history.pushState({}, '', url);
            }

            this.dynamicImportPage().then(() => {
                this.page = this.pages[this.template];
                this.page.show();

                this.afterPageLoaded();
            });
        }else{
            console.log("Error!");
        }
    }

    onPopState(){
        this.handlePageChange({url: window.location.pathname, push: false});
    }

    /**
     * Listeners
     * */
    addEventListener(){
        // Handle links click
        this.addLinksListener();

        // handlePopstate
        if(!this.handlePopstateChange){
            this.handlePopstateChange = this.onPopState.bind(this);
            window.addEventListener('popstate', this.handlePopstateChange);
        }
    }

    removeLastEventListener(){
        window.removeEventListener('popstate', this.handlePopstateChange);
    }

    addLinksListener(){
        const links = document.querySelectorAll('a:not([href^="#"])');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // external link
                if(link.getAttribute('href') === link.href) return;
                e.preventDefault();

                const {href} = link;
                this.handlePageChange({url: href});
            });
        });
    }
}

new App();