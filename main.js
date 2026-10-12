//
// LaunchDarkly Hello World example app for Electron
//
// This app requests all the client-side feature flags for a given LaunchDarkly environment
// and displays them in a window. It uses streaming mode so that if any flag is changed on
// the LaunchDarkly dashboard, the on-screen value will be updated.
//
// The application structure is based on the Electron Quick Start Guide: http://electron.atom.io/docs/tutorial/quick-start.
//

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800, height: 600, webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

// Wait until Electron says it has fully started up.
app.on('ready', () => {
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});
