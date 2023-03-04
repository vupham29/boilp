const {isPathExistSync, cloneFile} = require("./utils/utils");
const path = require('path');

const createLessonsPrototype = (lessons = []) => lessons.map(lesson => {
    const {lessons: pages} = lesson;

    const appPath = path.join('app', 'pages', lesson.base);
    const pugPath = path.join('views', lesson.base);

    pages.forEach((page, i) => {
        if(!page.id){
            page.id = `${lesson.base}-${('0' + (i + 1)).slice(-2)}`;
            console.log(page.id);
        }
        const templateName = `${lesson.base}-template`;

        // template doesn't exist => simply return, not create the prototype for it
        if(!isPathExistSync(appPath, templateName, '.js')) return; // js file

        // clone the template for the new-id
        cloneFile(appPath, templateName, page.id, '.js'); // app file

        // pug template
        if(!isPathExistSync(pugPath, templateName, '.pug')) return; // pug file

        cloneFile(pugPath, templateName, page.id, '.pug'); // pug file
    });

});

module.exports = createLessonsPrototype([
    {
        title: 'WebGL Fundamentals',
        base: 'webgl',
        lessons: [
            {
                title: 'App boilerplate'
            },
            {
                title: 'App boilerplate'
            }
        ]
    },
    {
        title: 'GL Shader Language',
        base: 'glsl',
        lessons: [
            {
                title: 'App boilerplate'
            }
        ]
    },
]);