import GameObject from './engine/GameObject';

// eslint-disable-next-line
function downloadFile(filename, contentType, content) {
  const blob = new Blob([content], {
    type: contentType || 'application/octet-stream'
  });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined')
      tempLink.setAttribute('target', '_blank');

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}

export default class FPSCounter extends GameObject {
  table = [];

  onInit = game => {
    this.game = game;
  };

  // onUpdate = () => {
  //   const { ticker } = this.game;

  //   if (this.table.length > 250) {
  //     const data = this.table
  //       .map(row => row.map(n => String(n * 1e3)).join('\t'))
  //       .join('\n');
  //     downloadFile('data.csv', 'text/csv', data);
  //     this.game.stop();
  //   } else {
  //     this.table.push([ticker.time, ticker.deltaTime]);
  //   }
  // };

  onRender = ctx => {
    const { ticker } = this.game;

    ctx.fillStyle = 'gray';
    ctx.font = '24px monospace';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';
    ctx.fillText(`${Math.round(ticker.fps)} FPS`, 0, 0);
  };
}
