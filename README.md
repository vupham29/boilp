# Learning Template

During my learning process, I have built this. But when I looked back, I thought that I have spent more and more times
to build this site for my learning, and it helped me very much. I don't need to create a dev server for dev-mode or
install and config some library to build production site.

With all the best, hope you like it

> Loading another page => NOT Barba.js, just a simple function that I have written

## Demo site

![Demo site](./shared/ezgif-2-456b57770b.gif)

## How to use

### Step 1:

- Add new lesson in `pages.js` (you can duplicate the old one)

![Step 1](./shared/ezgif-1-a5d377d49b.gif)

### Step 2:

- The engine will generate the file automatically.
  
![Step 2](./shared/ezgif-1-11ff4f86ec.gif)

- Open dev server -> that's enough

![Step 2](./shared/ezgif-5-94d2b33b8f.gif)

## Deployment

Run `./public` in dev mode

```shell
npm start
```

Build files from `./src` and `./public` to `./dist` for production and run in production mode

```shell
npm run build
```
