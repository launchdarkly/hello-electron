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

// Set launchDarklyEnvironmentId to your LaunchDarkly client-side ID.
const launchDarklyEnvironmentId = '';

// Set up the user properties. This user should appear on your LaunchDarkly
// users dashboard soon after you run the demo.
const launchDarklyUser = {
  key: 'example-user-key',
  name: 'Sandy'
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
  // Here we ensure that the SDK shuts down cleanly and has a chance to
  // deliver analytics events to LaunchDarkly before the program exits.
  // If analytics events are not delivered, the user properties and flag
  // usage statistics will not appear on your dashboard. In a normal
  // long-running application, the SDK would continue running and events
  // would be delivered automatically in the background.
  launchDarklyMainProcessClient.close();
  app.quit();
});
