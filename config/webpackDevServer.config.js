const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const paths = require('./paths');

module.exports = (proxy, allowedHost) => ({
  // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
  // websites from potentially accessing local content through DNS rebinding:
  // https://github.com/webpack/webpack-dev-server/issues/887
  // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
  // However, it made several existing use cases such as development in cloud
  // environment or subdomains in development significantly more complicated:
  // https://github.com/facebookincubator/create-react-app/issues/2271
  // https://github.com/facebookincubator/create-react-app/issues/2233
  // While we're investigating better solutions, for now we will take a
  // compromise. Since our WDS configuration only serves files in the `public`
  // folder we won't consider accessing them a vulnerability. However, if you
  // use the `proxy` feature, it gets more dangerous because it can expose
  // remote code execution vulnerabilities in backends like Django and Rails.
  // So we will disable the host check normally, but enable it if you have
  // specified the `proxy` setting. Finally, we let you override it if you
  // really know what you're doing with a special environment variable.
  disableHostCheck:
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
  // compress generated files using gzip
  compress: true,
  // turn off WebpackDevServer's own logs because they aren't generally useful
  clientLogLevel: 'none',
  // By default WebpackDevServer serves physical files from current directory
  // in addition to all the virtual build products that it serves from memory.
  // This is confusing because those files won’t automatically be available in
  // production build folder unless we copy them. However, copying the whole
  // project directory is dangerous because we may expose sensitive files.
  // Instead, we establish a convention that only files in `public` directory
  // get served. Our build script will copy `public` into the `build` folder.
  // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
  // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
  // Note that we only recommend to use `public` folder as an escape hatch
  // for files like `favicon.ico`, `manifest.json`, and libraries that are
  // for some reason broken when imported through Webpack. If you just want to
  // use an image, put it in `src` and `import` it from JavaScript instead.
  contentBase: paths.appPublic,
  watchContentBase: true,
  // Enable hot reloading server. It will provide /sockjs-node/ endpoint
  // for the WebpackDevServer client so it can learn when the files were
  // updated. The WebpackDevServer client is included as an entry point
  // in the Webpack development configuration. Note that only changes
  // to CSS are currently hot reloaded. JS changes will refresh the browser.
  hot: true,
  // it is important to tell WebpackDevServer to use the same "root" path as we
  // specified in the config
  publicPath: paths.servedPath,
  // WebpackDevServer is noisy by default so we emit custom message instead
  // by listening to the compiler events with `compiler.plugin` calls above.
  quiet: true,
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebookincubator/create-react-app/issues/293
  watchOptions: {
    ignored: /node_modules/
  },
  // Enable HTTPS if the HTTPS environment variable is set to 'true'
  https: process.env.HTTPS === 'true',
  host: process.env.HOST || '0.0.0.0',
  // show error overlay if there are any build errors
  overlay: true,
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true
  },
  public: allowedHost,
  proxy,
  before(app) {
    // This service worker file is effectively a 'no-op' that will reset any
    // previous service worker registered for the same host:port combination.
    // We do this in development to avoid hitting the production cache if
    // it used the same host and port.
    // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
    app.use(noopServiceWorkerMiddleware());
  }
});
