// Packages
require("dotenv").config({path: ".env"});
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ip = require('ip');

// Pages
const PAGES = require("./pages");

const app = express();

// set views engine
app.set("view engine", "pug");

// parse incoming data request
app.use(bodyParser.urlencoded({extended: false}));

// load static file
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    // page title
    app.locals.pageTitle = 'Learning Template';

    // preloader
    // app.locals.preloader = {
    //     title: "Learning Template"
    // };

    app.locals.pages = PAGES;
    next();
});

// Home Page
app.get("/", (req, res) => {
    res.render("pages/home", {
        title: "Home",
    });
});

app.get('/:base', (req, res, next) => {
    const base = req.params.base;

    // not exist base
    if(!base){
        return next(new Error(`Not found the base`));
    }

    const baseResult = PAGES.find(page => page.base === base);

    // not found the base
    if(!baseResult){
        return next(new Error(`Found the base but doesn't exist`));
    }

    // render the first page
    const result = baseResult.pages[0];

    if(req.url.slice(-1) === '/') return res.redirect(`${result.id}`);
    res.redirect(`${base}/${result.id}`);
});

app.get("/:base/:id", (req, res, next) => {
    const base = req.params.base;
    const id = req.params.id;

    // not exist base or id
    if(!base || !id){
        return next(new Error(`Not found base and id`));
    }

    const baseResult = PAGES.find(page => page.base === base);
    const pageResult = baseResult.pages.find(page => page.id === id);

    // not found the base
    if(!baseResult){
        return next(new Error(`Found the base but doesn't exist`));
    }

    // not found the ID
    if(!pageResult){
        return next(new Error(`Found the base but ID doesn't exist`));
    }

    res.render(`${base}/${pageResult.id}`, {
        title: pageResult.title,
        base: base,
        id: pageResult.id,
    });
});

// Error Handler
app.use((req, res, next) => {
    next(new Error("URL doesn't exist"));
});

// Not found page
app.use((error, req, res, next) => {
    console.log(error);
    res.render("pages/404", {
        title: 'OOPS! \n' + '404 PAGE NOT FOUND',
        message: 'The page you’re looking for does not exist or has been removed.\n' + 'You can proceed to our Homepage.',
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT} - http://${ip.address()}:${process.env.PORT}`);
});