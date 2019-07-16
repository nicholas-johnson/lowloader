# Low Loader

An unsurprising script loader. Give it a URL, it will download the JavaScript from the location and resolve a promise when it's done.

## Basic Usage

    import loader from 'lowloader';

    const url = 'http://www.cdn.com/mycode.js'
    loader.load(url).then(() => {
      // do what you like 
    )
