const express = require('express');
const Primus = require('primus');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const cors = require('cors')

const server = require('http').createServer(app);
const primus = new Primus(server);
// primus.save(__dirname +'/primus.js');

const MPC = require('mpc-js').MPC;
const mpc = new MPC();

app.set('mpc', mpc);

app.set('json spaces', 2);
app.set('port', process.env.PORT || 3030);
// app.use(express.logger('dev'));
app.use(bodyParser.json())
app.use(require('express-promise')());
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

primus.on('connection', function connection(spark) {
    console.log('new connection');
});


const playlistRoute = require('./routes/playlists');
const artistRoute = require('./routes/artists');
const albumRoute = require('./routes/album');
const playbackRoute = require('./routes/playback');
const replacePlaylist = require('./routes/replacePlaylist');
app.use(playlistRoute);
app.use(artistRoute);
app.use(albumRoute);
app.use(playbackRoute);
app.use(replacePlaylist);


mpc.connectTCP('mainpc', 6600);
mpc.on('ready', () => {
  console.log('Connection to mpd established');

  mpc.on('changed-player', () => {
    mpc.status.status().then(status => {
      primus.write({event: 'changed-player', payload: status});
    });
  });
  mpc.on('changed-playlist', () => {
    primus.write({event: 'changed-playlist'});
  });

  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
