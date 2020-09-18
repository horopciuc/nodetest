// import win from './app';
// import * as win from './app';
// import electronStart from './app.js';

const express = require('express');
const { app, ipcMain, BrowserWindow } = require('electron');
const appExpress = express();
const path = require('path');


port = 3000;
host = '127.0.0.1';

var name = '',
    team = '',
    kills = 0,
    deaths = 0;

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
// electronStart();

appExpress.get('/', (req, res) => {
    console.log("handling get request"); 
});

appExpress.post('/', (req, res) => {
    var body = '';
    req.on('data', data => {
        var parsedData = JSON.parse(data);
        if (parsedData.player) {
            if (parsedData.player.name) {
                body += 'Name -> ' + parsedData.player.name + '\n';
                name = parsedData.player.name
            } else {
                name = '';
            }
            if (parsedData.player.team == 'T') {
                body += 'Team -> Terrorists' + '\n';
                team = 'Terrorists';
            } else {
                body += 'Team -> Counter Terrorists' + '\n';
                team = 'Counter Terrorists';
            }
            if (parsedData.player.match_stats) {
                body += 'Kills -> ' + parsedData.player.match_stats.kills + '\n';
                kills = parsedData.player.match_stats.kills;
            } else {
                kills = 0;
            }            
            parsedData.player.match_stats  ? 
                body += 'Deaths -> ' + parsedData.player.match_stats.deaths + '\n' 
                : '';
        }
    
    });
    req.on('end', () => {
        console.log('Payload: \n' + body);
        win.webContents.send('name', name ? name : '');
        win.webContents.send('team', team ? team : '');
        win.webContents.send('kills', kills ? kills : 0);
        res.end( '' );
    });
});

appExpress.listen(port, () => {
    console.log(`Listening to ${port}`);
});

console.log('Listening at http://' + host + ':' + port);

