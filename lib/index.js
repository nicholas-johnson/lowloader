'use strict';

// Caching
var _cache = {};
var cache = {
    /**
     * adds a promise to the cache under a URL
     * @param url
     * @param data
     */
    put: function (url, data) {
        _cache[url] = data;
    },
    /**
     * gets a promise from the cache
     * @param url
     */
    get: function (url) { return _cache[url]; },
    /**
     * removes a promise from the cache
     * @param url
     */
    remove: function (url) {
        delete _cache[url];
    },
    /**
     * Test to see if a promise is in the cache
     * @param url
     */
    check: function (url) { return !!cache.get(url); },
    /** Clears the whole cache */
    clear: function () {
        for (var url in _cache)
            cache.remove(url);
    }
};

var load = function (url) {
    var loader = new Promise(function (resolve, reject) {
        var el = document.createElement("script");
        el.async = false;
        el.onload = function (data) {
            resolve(url);
        };
        el.onerror = function (err) {
            console.warn("Lowloader: could not load code from url: " + url + " - " + err.message);
            cache.remove(url);
            reject(url);
        };
        el.src = url;
        document.head.appendChild(el);
    });
    cache.put(url, loader);
    return loader;
};
var loader = function (url) {
    return cache.check(url) ? cache.get(url) : load(url);
};

module.exports = loader;
