const {isPathExistSync, cloneFile, createDirectory, stringToSlug} = require("./utils/utils");
const path = require('path');

const {VIEW_ENGINE} = require('./utils/configs');
const extensionEngine = '.' + VIEW_ENGINE;

const createPagesPrototype = (prototypes = []) => prototypes.map(prototype => {
    const {pages} = prototype;

    const appPath = path.join('app', 'pages', prototype.base);
    const viewEnginePath = path.join('views', prototype.base);

    pages.forEach((page, i) => {
        if(!page.id){
            page.id = stringToSlug(page.title);
        }
        const templateName = `template`;

        // template doesn't exist => simply return, not create the prototype for it
        if(!isPathExistSync(appPath, templateName, '.js')){
            // create directory first
            createDirectory(appPath);

            // template path
            const templatePath = path.join(appPath, '..', 'template');

            cloneFile({
                source: path.join(templatePath, 'index.js'),
                destination: path.join(appPath, 'index' + '.js')
            });

            cloneFile({
                source: path.join(templatePath, 'template.js'),
                destination: path.join(appPath, templateName + '.js')
            });
        }

        // clone the template for the new-id
        cloneFile({
            source: path.join(appPath, templateName + '.js'),
            destination: path.join(appPath, page.id + '.js')
        }); // app file

        // view engine template
        if(!isPathExistSync(viewEnginePath, templateName, extensionEngine)){
            // create directory first
            createDirectory(viewEnginePath);

            // template path
            const templatePath = path.join(viewEnginePath, '..', 'template');

            cloneFile({
                source: path.join(templatePath, `template${extensionEngine}`),
                destination: path.join(viewEnginePath, templateName + extensionEngine)
            });
        }

        cloneFile({
            source: path.join(viewEnginePath, templateName + extensionEngine),
            destination: path.join(viewEnginePath, page.id + extensionEngine)
        }); // engine file
    });

    return prototype;
});

module.exports = createPagesPrototype([
    // {
    //     title: 'WebGL Fundamentals',
    //     base: 'webgl',
    //     pages: [
    //         {
    //             title: 'Drawing a single point'
    //         },
    //     ]
    // },
]);