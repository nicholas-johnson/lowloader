# Low Loader

An unremarkable script loader built for **Microfrontends.** Give it a URL, it will download the JavaScript from the location and resolve a promise when it's done.

Very simple, zero config, single purpose, tiny. No tooling required, it just works.

Designed for loading code from a CDN into a Browser. Entirely agnostic of build tool. Use Webpack, Rollup, Grunt, Browserify, etc, etc. Use any library, framework or language.

## Basic Usage

    import loader from 'lowloader';

    const url = 'http://www.cdn.com/myapp.js'
    loader.load(url).then((myApp) => {
      myApp.bootstrap();
    )

## Built for Microfrontends

Microfrontends let you manage legacy. Older code can be siloed and gradually replaced. Newer features can be built with newer kit. This makes it easier to attract and retain talent since devs get to use the most interesting tools, and it means you are not locked into decisions made five years ago that may no longer make sense.

This increases productivity since apps are kept small and never get too complex to understand. Smaller apps are faster to build and debug. Individual apps can be removed or replaced without throwing away the entire codebase. Legacy code can be put in a box. As long as it still works, it can go on serving customers.

LowLoader is a Framework/build tool agnostic low-touch script loader built for micro-frontends.

1. Build your app in whatever framework/tool you like. eg. create-react-app, Angular, AngularJS, Vue, Backbone, ES6, Typescript, JQuery, Webpack, Rollup, etc. etc.
2. lowloader.export your code.
3. Deploy your code to some web-accessible location. In production, this will be a CDN. For local dev, this might be a live-server, Apache webroot, IIS, etc.
4. lowloader.import your code from any web accessible URL.

Note that if you cannot lowloader.export (for example if you are loading a standard dependency) you can simply import and use a global. More on this later.

## Works well with Single Spa

To orchestrate code loading based on routing, I recommend Single-Spa. https://github.com/CanopyTax/single-spa

You can find a complete demo here, featuring:

* Vanilla React
* Create React App
* Vanilla ES6 App
* Legacy AngularJS App
* Pushstate Routing
* Dynamic dependency Loading

Work in progress:

https://github.com/nicholas-johnson/lowloader-singlespa-microfrontends-example

## Export arbitrary code from a web location and import it on demand

Microfrontends work best if you can build your apps independently, put them on a CDN, and load them into your SPA on demand. If your user is not viewing the settings page, just don't load it. If the user is not on a dashboard, don't load the code. Load the code you need on-demand as the user navigates your app.

Create a js file and put it on a CDN (http://mycdn.com/my-app.js):

    import lowloader from 'lowloader';
    
    // You can export anything you like
    const app = {
      sayHello: () => console.log('hello');
    }
    
    // When the code is downloaded, the exported value 
    // will be made available to the import Promise resolve function.
    lowloader.export(app);

Now from another js file, you can dynamically import it.

    import lowloader from 'lowloader';

    lowloader.import('http://mycdn.com/my-app.js)
      .then((myApp) => myApp.sayHello());

## Dynamically load shared dependencies using promises

Say you have several microfrontends that use the same libraries, eg. React and ReactDom. You can load them using lowLoader before loading your app. If another app has already loaded them, they will be cached, and will not be loaded again.

    const react = 'http://www.cdn.com/react.js'
    const reactDOM = 'http://www.cdn.com/react-dom.js'
    const app = 'http://www.cdn.com/my-app.js'

    loader.load(react)
      .then(() => { loader.load(reactDom) )
      .then(() => { loader.load(app) )
      .then(() => { app.init() )

## Also works with async await

    const init = async () => {
      await loader.load(dependency_1)
      await loader.load(dependency_2)
      await loader.load(dependency_3)
    }

## Globals and Shared Dependencies

It is not always practical to lowloader.export(code). You may be downloading a library from a CDN. Maybe React or Highcharts. In this case, you can simply use a global.

Most libraries that are exported from a CDN will create a global. React creates window.React. JQuery creates window.$.

Here we download React and ReactDom.

    const cdn = 'https://unpkg.com'
    const reactUrl = `${cdn}/react@16/umd/react.development.js`;
    const reactDomUrl = `${cdn}react-dom@16/umd/react-dom.development.js`

    loader.load(reactUrl)
      .then(() => {loader.load(reactDomUrl)})
      .then(() => {
        ReactDOM.render(
          React.createElement('div', null, 'Hello World'),
          document.getElementById('root')
        );
      })

If you want to load dependencies this way, and you find yourself relying on global values of React in your microapps, you can tell Webpack to treat React as an [external](https://webpack.js.org/configuration/externals/). This will tell React to look for window.react instead of bundling React into the app. This will allow you to share a common version of React between multiple microapps.

## Local caching

Lowloader automatically caches by URL. You won't download the same code more than once, no matter how many times you import it or from which file or codebase. Lowloader's cache is a browser singleton so you can import wherever you like and Lowloader will handle it. If the code is already loaded, `import` will return a resolved promise.

## Comparison with SystemJS

Because SystemJS is implemented with tooling, it requires a good deal of setup, and can be a pain to integrate into older apps.

Lowloader takes a zero config approach. It does one thing, it loads code into the browser. There's nothing to think about and nothing to go wrong. Your existing build pipeline can remain unchanged.

## How it works

It's actually incredibly simple.

There are two ways to download and run code from the Internet.

- A Script tag
- AJAX plus eval

The second option gives you greater flexibility but breaks all the debugging tools in Chrome. LowLoader loads code from the Internet by dynamically adding script tags to the head of the page, then managing onLoad and onError.

onLoad the promise resolves. onError it rejects. Export simply squirrels the object into a temporary cache location. Import retrieves it.


