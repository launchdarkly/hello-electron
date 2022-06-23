//
// LaunchDarkly Hello World example app for Electron
//
// This app requests all the client-side feature flags for a given LaunchDarkly environment
// and displays them in a window. It uses streaming mode so that if any flag is changed on
// the LaunchDarkly dashboard, the on-screen value will be updated.
//
// The application structure is based on the Electron Quick Start Guide: http://electron.atom.io/docs/tutorial/quick-start.
//

const electron = require('electron');
const ldclient = require('launchdarkly-electron-client-sdk');
const path = require('path');
const url = require('url');

const app = electron.app;

let launchDarklyMainProcessClient;

// Put the client-side ID for your LaunchDarkly environment here. The default value below will
// still work, but it's for a demo environment where you would not be able to modify the flags.
const launchDarklyEnvironmentId = '5c0727b6abf23c53a840a9ed';

const launchDarklyUser = {
  key: 'test-user-key'
};

const launchDarklyOptions = {
  streaming: true // Necessary in order for live flag updating to work
};

function createWindow () {
  const mainWindow = new electron.BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

// Wait until Electron says it has fully started up.
app.on('ready', () => {
  // Start the LaunchDarkly client in the main process. This is the object that actually
  // connects to LaunchDarkly; the client object in window.js is just a mirror of it.
  launchDarklyMainProcessClient = ldclient.initializeInMain(
    launchDarklyEnvironmentId,
    launchDarklyUser,
    launchDarklyOptions
  );

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});
