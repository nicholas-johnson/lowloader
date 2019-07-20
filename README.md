# Low Loader

An unsurprising script loader built for **Microfrontends.** Give it a URL, it will download the JavaScript from the location and resolve a promise when it's done.

Designed for loading code from a CDN into a Browser. Entirely agnostic of build tool. Use Webpack, Rollup, Grunt, Browserify, etc, etc. Use any library or framework.

## Basic Usage

    import loader from 'lowloader';

    const url = 'http://www.cdn.com/mycode.js'
    loader.load(url).then(() => {
      // do what you like
    )

## Built for Microfrontends

Microfrontends let you manage legacy. Older code can be siloed and gradually replaced. Newer features can be built with newer kit. This makes it easier to attract and retain talent, since devs get to use the most interesting tools, and it means you are not locked into decisions made five years ago that may no longer make sense.

This increases productivity, since apps are kept small and never get too complex to understand. Smaller apps are faster to build and debug. Individual apps can be removed or replaced without throwing away the entire codebase. Legacy code can be put in a box. As long as it still works, it can go on serving customers.

LowLoader is a Framework/build tool agnostic script loader built for micro-frontends.

1. Build your app in whatever framework/tool you like. eg. create-react-app.
2. Deploy your code to some web-accessible location. In production this will be a CDN. For local dev, this might be a live-server, Apache webroot, IIS webroot, etc.
3. Load your code on demand with loader.load.

To orchestrate code loading based on routing, we recommend Single-Spa. https://github.com/CanopyTax/single-spa

## Export arbitrary code from a web location and import it on demand

Microfrontends work best if you can build your apps independently, put them on a CDN, and load them into your SPA on demand. If your user is not viewing the settings page, just don't load it. If the user is not on a dashboard, don't load the code. Load the code you need on demand as the user navigates your app.

Create a js file and put it on a CDN (http://mycdn.com/my-app.js):

    import lowloader from 'lowloader';

    const app = {
      sayHello: () => console.log('hello');
    }

    lowloader.export(app);

Now from another js file you can dynamically import it.

    import lowloader from 'lowloader';

    lowloader.import('http://mycdn.com/my-app.js)
      .then((myApp) => myApp.sayHello());

## Dynamically load shared dependencies using promises

Say you have several microfrontends that use the same libraries, eg. react and reactDom. You can load them using lowLoader before loading your app. If another app has already loaded them, they will be cached, and will not be loaded again.

    const react = 'http://www.cdn.com/react-dom.js'
    const app = 'http://www.cdn.com/my-app.js'

    loader.load(react)
      .then(() => { loader.load(app) )
      .then(() => { app.init() )

## Also works with async await

    const init = async () => {
      await loader.load(dependency_1)
      await loader.load(dependency_2)
      await loader.load(dependency_3)
    }

## A note on globals

There are two ways to download and run code from the internet.

- A Script tag
- AJAX plus eval

The second option gives you greater flexibility, but breaks all the debugging tools. LowLoader loads code from the internet using a script tag. However a script tag will not give you a return value.

For this reason, you need some way to get objects back out of the script you have loaded.

There are two ways to do this:

1. With a global (write to window)
2. Using LowLoader's simple module exporter.

### Option 1 - with a global

The simplest way to do this is with a global. This is a low stress solution that requires little change to your code. Most standard libraries will create a global for you. For example:

    const cdn = 'https://unpkg.com'
    const reactUrl = `${cdn}/react@16/umd/react.development.js`;
    const reactDomUrl = `${cdn}react-dom@16/umd/react-dom.development.js`

    loader.load(reactUrl)
      .then(() => {loader.load(reactDomUrl)})
      .then(() => {
        reactDom.createElement('div', null)
      })

IF you like this approach, you may wish to write to window in your build artifact, for example:

    window.myApp = app;

    loader.load(myAppUrl)
      .then(() => {
        window.myApp.init();
      });

However,you may (quite reasonably) have philosophical objections to this approach, so LowLoader also provides you with a module exporter.

### Option 2 - LowLoader Browser Modules

If you'd like to have your micro-app export itself as an importable module, you can do this:

In you app script, do this

    import loader from 'low_loader';
    const myApp = {
      init() {
        console.log('why hello there');
      }
    }

    loader.export( myApp );

Now in your microfrontend code, you can now write:

    import loader from 'low_loader';

    const url="https://cdn/path/to/myapp.js";

    loader.import(url)
      .then((myApp) => {
        myApp.init(); // outputs 'why hello there'
      })

Note that the `then` callback function receives the microapp as a parameter. No globals required.

## LowLoader / SingleSpa demo

Coming Soon...
