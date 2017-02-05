var mpd = require('mpd'),
    cmd = mpd.cmd
var client = mpd.connect({
  port: 6600,
  host: 'localhost',
});
client.on('ready', () => {
  client.sendCommand(cmd("list album group albumartist", []), function(err, msg) {
    if (err) throw err;
    console.log(msg);
  });
});
