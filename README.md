## LaunchDarkly Sample Electron Application 

We've built a simple Electron application that demonstrates how LaunchDarkly's SDK works. 

### Build instructions 

1. Clone this repository: `git clone https://github.com/launchdarkly/hello-electron.git`
2. Go into the `hello-electron` directory.
3. If you want the application to display your own feature flags, instead of our example flags, edit `main.js` to set `launchDarklyEnvironmentId` to the client-side ID for your LaunchDarkly environment (shown in [Account Settings](https://app.launchdarkly.com/settings/projects)). (Note that your flags will only be available if you have checked the "Make this flag available to client-side SDKs" box in the feature flag settings.)
4. Install dependencies: `npm install`
5. Start the application: `npm start`

### More information

- [Electron SDK Reference](https://docs.launchdarkly.com/v2.0/docs/electron-sdk-reference)
