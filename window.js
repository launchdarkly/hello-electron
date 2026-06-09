// This script is loaded from index.html, so it executes only within the Electron
// renderer process for the window.

const $ = require('jquery');
const { createClient } = require('@launchdarkly/js-client-sdk');

// Set launchDarklyClientSideId to your LaunchDarkly client-side ID.
const launchDarklyClientSideId = '';

// Set up the context properties. This context should appear on your LaunchDarkly
// contexts dashboard soon after you run the demo.
const context = {
  kind: 'user',
  key: 'example-user-key',
  name: 'Sandy'
};

const client = createClient(launchDarklyClientSideId, context, {
  streaming: true,
});

client.start().then(() => {
  $('#ld-status').text('Loaded feature flags.');

  updateFlagValues();

  // Listening for the "change" event allows us to receive flag changes at any time.
  client.on('change', () => {
    updateFlagValues();
    $('#ld-status').text('Updated feature flags.');
  });
}).catch((err) => {
  $('#ld-status').text('Error initializing LaunchDarkly: ' + err.message);
});

function updateFlagValues() {
  const flagsAndValues = client.allFlags();

  // Build an HTML table of all the current flag values.
  const table = $('<table></table>');
  const tbody = $('<tbody></tbody>');
  table.append(tbody);
  tbody.append($('<tr><th>Flag key</th><th>Value</th></tr>'));

  for (var key in flagsAndValues) {
    const value = flagsAndValues[key];
    const row = $('<tr></tr>');
    row.append($('<td></td>').text(key));
    row.append($('<td></td>').text(JSON.stringify(value)));
    tbody.append(row);
  }

  $('#ld-flags').empty().append(table);
}
