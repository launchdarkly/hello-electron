## LaunchDarkly sample Electron application 

We've built a simple Electron application that demonstrates how LaunchDarkly's SDK works.

Below, you'll find the build procedure. For more comprehensive instructions, you can visit your [Quickstart page](https://app.launchdarkly.com/quickstart#/) or the [Electron SDK reference guide](https://docs.launchdarkly.com/sdk/client-side/electron).

### Build instructions 

1. In LaunchDarkly, make sure you have at least one feature flag. For each flag, check the "Make this flag available to client-side SDKs" box in the flag's **Settings** tab.
2. Edit `main.js` and set the value of `launchDarklyEnvironmentId` to your LaunchDarkly client-side ID.

```
const launchDarklyEnvironmentId = '5e44ab7d09107307fa78bd09';
```

3. Install dependencies: `npm install`.
4. Start the application: `npm start`.

The application displays a table of flag keys and flag values for the example user.
