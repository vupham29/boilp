const {isPathExistSync, cloneFile, createDirectory} = require("./utils/utils");
const path = require('path');

const createLessonsPrototype = (lessons = []) => lessons.map(lesson => {
    const {lessons: pages} = lesson;

    const appPath = path.join('app', 'pages', lesson.base);
    const pugPath = path.join('views', lesson.base);

    pages.forEach((page, i) => {
        if(!page.id){
            page.id = `${lesson.base}-${('0' + (i + 1)).slice(-2)}`;
        }
        const templateName = `${lesson.base}-template`;

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

        // pug template
        if(!isPathExistSync(pugPath, templateName, '.pug')){
            // create directory first
            createDirectory(pugPath);

            // template path
            const templatePath = path.join(pugPath, '..', 'template');

            cloneFile({
                source: path.join(templatePath, 'template.pug'),
                destination: path.join(pugPath, templateName + '.pug')
            });
        }

        cloneFile({
            source: path.join(pugPath, templateName + '.pug'),
            destination: path.join(pugPath, page.id + '.pug')
        }); // pug file
    });

    return lesson;
});

module.exports = createLessonsPrototype([
    {
        title: 'WebGL Fundamentals',
        base: 'webgl',
        lessons: [
            {
                title: 'Drawing a single point'
            },
        ]
    },
]);