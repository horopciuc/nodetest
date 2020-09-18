const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');

var electronStart = function() {

    var name = '',
        team = '',
        kills = 0,
        deaths = 0;
    var win;

    function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        movable: false,
        show: true,
        frame: false,
        // transparent: true,
        backgroundColor: '#FFFFFF',
        fullscreen: true,
        disableHtmlFullscreenWindowResize: true,
        disableAutoHideCursor: true,
        webPreferences: {
            nodeIntegration: true
        },
        center: true
    });

    // and load the index.html of the app.
    //   win.loadFile('index.html')
    win.loadFile(path.join(__dirname, 'index.html'));
    }

    app.whenReady().then(createWindow);

}

export default electronStart;
// module.exports = electronStart;