const path = require('path');
const express = require('express');
const mung = require('express-mung');

const router = express.Router();

function addAlbumArt(body, req, res) {
  return body.then((result) => (
    result.map((item) => {
      item.albumArt = `http://mainpc:81/${path.dirname(item.path)}/albumart.jpg`
      return item;
    })
  ));
}

router.use('/playlists/:id', mung.jsonAsync(addAlbumArt));

router.get('/playlists/:id', (req, res) => {
  const id = req.params.id;
  const mpc = req.app.get('mpc');

  if (id === 'current') {
    return res.json(mpc.currentPlaylist.playlistInfo());
  } else {
    return res.json(mpc.storedPlaylists.listPlaylistInfo(id).catch(() => {res.status(404)}));
  }
});

router.get('/playlists', (req, res) => {
  const mpc = req.app.get('mpc');
  return res.json(mpc.storedPlaylists.listPlaylists());
});


module.exports = router;
