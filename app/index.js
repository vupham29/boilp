import Preloader from './components/Preloader';
import '@/vendors/theme/theme.min';
import Aside from "@/components/Aside";

class App{
    constructor(){
        this.createContent();
        this.createPreloader();
        this.createPage();
        this.afterPageLoaded();

        // init Aside
        this.aside = new Aside();
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
                        resolve({
                            hasExisted: false
                        });
                    });
            }else{
                resolve({
                    hasExisted: true
                });
            }
        });
    }

    createPreloader(){
        if(document.body.hasAttribute('data-preloader')){
            this.preloader = new Preloader({
                    onPreloaded: this.onPreloaded.bind(this),
                }
            );
        }
    }

    /**
     * Events
     * */

    onPreloaded(){
        this.preloader.destroy();
    }

    async handlePageChange({url, push = true}){
        // animation
        await this.page.hide();

        // fetch new page
        const request = await window.fetch(url);

        if(request.status === 200){
            // destroy old page
            this.page.destroy();

            // get html of new page
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

            this.dynamicImportPage().then((response) => {
                if(!response.hasExisted){
                    // not existed before
                    // create the new one
                    this.page = this.pages[this.template];
                }else{
                    // has existed
                    this.page.create();
                }

                // animation
                this.page.show();

                // handle after page loaded
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

    addLinksListener(){
        const links = document.querySelectorAll('a:not([href^="#"]):not(.dynamic-link-enabled)');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const currentURL = new URL(location.href);
                const linkURL = new URL(link.href);

                // external link
                if(currentURL.host !== linkURL.host) return;

                // internal link
                e.preventDefault();

                // current page => no need to do anything
                if(currentURL.href === linkURL.href) return;

                const {href} = link;
                this.handlePageChange({url: href});
            });

            link.classList.add('dynamic-link-enabled');
        });
    }
}

new App();