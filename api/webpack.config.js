module.exports = {
    entry: "./index.js",
    resolve: {
      fallback: {
        "url": require.resolve("url/"),
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "buffer": false,
        "url": false,
        "path": false,
        "querystring": require.resolve("querystring-es3"),
        "http": require.resolve("stream-http"),
        "http": false,
        "crypto": false,
        "zlib": false,
        "querystring": false
      }
    }
  };