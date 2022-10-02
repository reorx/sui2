# SUI2

*a startpage for your server and / or new tab page*

Forked from [sui](https://github.com/jeroenpardon/sui), sui2 adds
new features like keyboard navigation to boost your productivity.
It's a complete refactor, brings new technologies for easier development & deployment.

See how keyboard navigation works in action:

<video src="https://user-images.githubusercontent.com/405972/193420471-7454270e-7bcc-43cc-a61d-e8b65e6b09f3.mov"></video>


## Deploy to any static hosting

sui2 uses Vite to build a staic website, which means it's nothing but vanilla HTML/CSS/JavaScript that could be deployed to anywhere you want.

To build the project, simply follow the steps below.

1. Install dependencies: `npm i`
2. Create you own `data.json`.

   sui2 get all the data it requires from `data.json`, you can make a copy from `data.example.json`, and then edit it with your own applications and bookmarks.
3. Build the result: `npm run build`

   The result will be stored in the `dist` folder
4. Upload to a static hosting.

   There are various hosting services like GitHub Pages, Cloudflare Pages, Netlify.
   Examples will be documented later on.
