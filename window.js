// This script is loaded from index.html, so it executes only within the Electron
// renderer process for the window.

const $ = require('jquery');
const ldclient = require('ldclient-electron');

const launchDarklyBrowserClient = ldclient.initializeInRenderer();

// Wait for the client to be initialized. 
launchDarklyBrowserClient.on('ready', () => {
  $('#ld-status').text('Loaded feature flags.');

  // Now we have flag values.
  updateFlagValues();

  // Listening for the "change" event allows us to receive flag changes at any time.
  launchDarklyBrowserClient.on('change', () => {
    updateFlagValues();
    $('#ld-status').text('Updated feature flags.');
  });
});

function updateFlagValues() {
  const flagsAndValues = launchDarklyBrowserClient.allFlags();
  // You could also check the value of an individual flag here by calling variation().

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
