# Low Loader

An unsurprising script loader designed for **Microfrontends.** Give it a URL, it will download the JavaScript from the location and resolve a promise when it's done.

## Basic Usage

    import loader from 'lowloader';

    const url = 'http://www.cdn.com/mycode.js'
    loader.load(url).then(() => {
      // do what you like
    )

## Dynamically load dependencies using promises

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

## Built for Microfrontends

One of the goals of microfrontends is to separate build processes. Another might build its artifacts using Webpack. One might build with rollup, or Webpack 2, or Grunt.

Microfrontends let you manage legacy. Older code can be siloed and gradually replaced. Newer features can be built with newer kit. This makes it easier to attract and retain talent, since devs get to use the most interesting tools.

This also increases productivity, since apps are kept small and never get too complex to understand. Individual apps can be removed or replaced without destroying the overall user experience.
