const { servedPath } = require('./paths');

// generate manifest.json
const manifestContents = JSON.stringify({
  short_name: 'asteroids.js',
  name: 'asteroids.js',
  icons: [192, 512].map(size => ({
    src: `${servedPath}/android-chrome-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png'
  })),
  start_url: `${servedPath}/`,
  display: 'standalone',
  theme_color: '#333',
  background_color: '#333'
});

// generate browserconfig.xml
const browserConfigContents =
  // prettier-ignore
  '<?xml version="1.0" encoding="utf-8"?>' +
  '<browserconfig>' +
    '<msapplication>' +
      '<tile>' +
        `<square150x150logo src="${servedPath}/mstile-150x150.png"/>` +
        '<TileColor>#333</TileColor>' +
      '</tile>' +
    '</msapplication>' +
  '</browserconfig>';

module.exports = class WebAppManifestPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      function addFile(fileName, data) {
        compilation.assets[fileName] = {
          source: () => data,
          size: () => data.length
        };
      }

      addFile('manifest.json', manifestContents);
      addFile('browserconfig.xml', browserConfigContents);
    });
  }
};
